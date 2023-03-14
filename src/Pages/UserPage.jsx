import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Utils/axios.config";
import QRCode from "react-qr-code";
import PreLoader from "../Components/PreLoader/PreLoader";
import colleges from "../Dataset/collegesKar.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { successToast } from "../Utils/Toasts/Toasts";

const collegesList = colleges.map((college) => (
  <option value={college.college}>{college.college}</option>
));

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [disUserEvents, setDisUserEvents] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [teamDropdown, setTeamDropdown] = useState({});
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/auth/user/status/`)
        .then((res) => {
          if (!res.data.data.authenticated) {
            setUser(null);
            return navigate("/login");
          }
          setUser(res.data.profile);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [navigate]);

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdating(true);
    if (!user.name || !user.college || !user.usn || !user.phone) {
      return setError("Please enter all fields");
    }

    await api
      .patch(`/users/`, user)
      .then((res) => {
        setUser(res.data.profile);
        setUpdating(false);
        setError(null);
      })
      .catch((err) => {
        setUpdating(false);
        if (err.response.status === 401) {
          return navigate("/login");
        } else if (err.response.status === 400) {
          setError("Invalid Fields");
        }
      });
  };

  const getUsersEvents = async () => {
    await api
      .get(`/teams/user/${uid}`)
      .then((res) => {
        const events = res.data.data.results;
        events.map((event) => {
          setTeamDropdown((obj) => ({ ...obj, [event._id]: false }));
          event.payment_status = false;
          getReciptsByTeam(event._id);
        });
        setUserEvents(events);
        setDisUserEvents(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReciptsByTeam = async (teamId) => {
    await api
      .get(`/receipts/team/${teamId}`)
      .then((res) => {
        const receipt = res.data.data.receipt;
        if (receipt.team._id === teamId)
          setUserEvents((prevArr) => {
            // find the index of the object with the matching id and set payment_status to true
            const index = prevArr.findIndex((obj) => obj._id === teamId);
            prevArr[index].payment_status = true;
            return [...prevArr];
          });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setUserEvents((prevArr) => {
            // find the index of the object with the matching id and set payment_status to false
            const index = prevArr.findIndex((obj) => obj._id === teamId);
            prevArr[index].payment_status = false;
            return [...prevArr];
          });
        }
      });
  };

  if (loading) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 min-h-[100vh] h-fit place-items-center justify-items-center bg-profile lg:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-profilec py-5">
      <div className="lg:col-start-2 lg:col-span-2 grid grid-cols-2 place-items-center md:w-4/5 w-11/12 p-5">
        <button
          className={`btn ${
            activeTab === "profile" ? "btn-secondary" : "btn-primary"
          } w-4/5`}
          onClick={() => setActiveTab("profile")}
        >
          My Profile
        </button>
        <button
          className={`btn ${
            activeTab === "events" ? "btn-secondary" : "btn-primary"
          } w-4/5`}
          onClick={() => {
            setActiveTab("events");
            getUsersEvents();
            // participated();
          }}
        >
          My Events
        </button>
      </div>
      {activeTab === "profile" && (
        <div className="lg:col-start-2 lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 place-items-center md:w-4/5 w-11/12 p-5 rounded-lg bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
          <div className="col-span-1 grid">
            <QRCode
              value={`${user.aura_id}, ${user.phone}, ${user.college}, ${user.email}`}
              level="L"
              className="w-32 h-32 md:w-44 md:h-44 m-4 max-w-none max-h-none bg-white p-2 justify-self-center"
              onClick={() => {
                navigator.clipboard.writeText(user.aura_id);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1500);
              }}
            />
            <h3 className="relative">
              Aura ID:{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(user.aura_id);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1500);
                }}
              >
                {user.aura_id}
              </span>
              {copied && (
                <span className="text-green-500 rounded-full inline absolute top-5 left-1/2 transform -translate-x-1/2 p-2 my-2 bg-slate-300">
                  Copied
                </span>
              )}
            </h3>
          </div>
          <div className="info lg:col-span-2 col-span-1 mt-5 w-full">
            <h1 className="text-3xl lg:text-left text-center">Your Profile</h1>
            {error && (
              <p className="msg-box text-red-500 text-center">{error}</p>
            )}
            {updating && (
              <p className="msg-box text-green-500 text-center">Updating</p>
            )}
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 my-1">
                <label className="py-3 col-span-1" htmlFor="name">
                  Name
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Name"
                />
              </div>
              <div className="grid grid-cols-1 my-1">
                <label className="py-3 col-span-1" htmlFor="email">
                  Email
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 outline-none"
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  required
                  placeholder="Your Email"
                  disabled
                />
              </div>
              <div className="grid grid-cols-1 my-1">
                <label className="py-3 col-span-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Your Phone Number"
                />
              </div>
              <div className="grid grid-cols-1 my-1">
                <label className="py-3 col-span-1" htmlFor="usn">
                  USN
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                  type="text"
                  name="usn"
                  id="usn"
                  value={user.usn}
                  onChange={handleInputChange}
                  required
                  placeholder="Your USN"
                />
              </div>
              <div className="grid grid-cols-1 my-1">
                <label className="py-3 col-span-1" htmlFor="college">
                  College
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                  type="text"
                  name="college"
                  id="college"
                  value={user.college}
                  onChange={handleInputChange}
                  required
                  placeholder="Your College Name"
                  list="colleges"
                />
                <datalist id="colleges">{collegesList}</datalist>
              </div>
              <button
                className="w-full mt-4 py-2 btn btn-primary"
                type="submit"
              >
                Save
              </button>
              <Link to="/reset-password">
                <button
                  className="w-full mt-4 py-2 btn btn-primary"
                  type="submit"
                >
                  Change Password
                </button>
              </Link>
            </form>
          </div>
        </div>
      )}
      {activeTab === "events" && (
        <div className="h-[100vh] lg:col-start-2 lg:col-span-2 grid grid-cols-1 items-start place-items-center md:w-4/5 w-11/12 p-5 rounded-lg bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
          <h1 className="text-3xl lg:text-left text-center">Your Events</h1>

          <div className="h-full w-full overflow-scroll [&::-webkit-scrollbar]:hidden mt-5">
            {disUserEvents && userEvents.length === 0 && (
              <p className="text-center text-lg">
                You have not registered for any events
              </p>
            )}
            {disUserEvents &&
              userEvents.length > 0 &&
              userEvents.map((event) => (
                <div className="flex flex-col justify-between items-center w-full bg-white rounded-lg py-3 md:px-5 px-1 my-3">
                  <div className="flex flex-row justify-between items-center w-full">
                    <h1 className="font-semibold text-lg  md:px-0 px-1">
                      {event.event_participated.event_title}
                      <span
                        className={`text-sm font-thin mx-2 px-3 inline-flex ${
                          event.payment_status ? "bg-green-200" : "bg-red-200"
                        }  rounded-full`}
                      >
                        {event.payment_status ? "Paid" : "Not Paid"}
                      </span>
                    </h1>
                    <button
                      className=" bg-gray-100 rounded-full py-1 px-3 inline-flex items-center"
                      onClick={() => {
                        setTeamDropdown({
                          ...teamDropdown,
                          [event._id]: !teamDropdown[event._id],
                        });
                      }}
                    >
                      Team{" "}
                      <FontAwesomeIcon
                        className="ml-2"
                        icon={
                          teamDropdown[event._id]
                            ? faCircleChevronUp
                            : faCircleChevronDown
                        }
                      />
                    </button>
                  </div>
                  {teamDropdown[event._id] && (
                    <div className="w-full mt-3 md:px-0 px-2">
                      <h3 className="font-semibold text-lg">
                        Team Name: {event.team_name}
                      </h3>
                      <div className="flex md:flex-row flex-col justify-between items-center w-full rounded-full bg-gray-100 mx-auto my-2 px-5 py-1">
                        <h1 className="font-semibold text-lg">
                          {event.team_leader.id === uid
                            ? "You"
                            : event.team_leader.name}
                          <span className="text-sm font-thin mx-2 px-3 bg-green-200 rounded-full">
                            Leader
                          </span>
                        </h1>
                        <h3 className="relative">
                          <span
                            className="font-semibold cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                event.team_leader.aura_id
                              );
                              successToast(
                                `Copied AURA ID ${event.team_leader.aura_id}`
                              );
                            }}
                          >
                            {event.team_leader.aura_id}
                          </span>
                        </h3>
                      </div>
                      {event.team_members.map((member) => (
                        <div className="flex md:flex-row flex-col justify-between items-center w-full rounded-full bg-gray-100 mx-auto my-2 px-5 py-1">
                          <h1 className="font-semibold text-lg">
                            {member.id === uid ? "You" : member.name}
                            <span className="text-sm font-thin mx-2 px-3 bg-green-200 rounded-full">
                              Member
                            </span>
                          </h1>
                          <h3 className="relative">
                            <span
                              className="font-semibold cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(member.aura_id);
                                successToast(
                                  `Copied AURA ID ${member.aura_id}`
                                );
                              }}
                            >
                              {member.aura_id}
                            </span>
                          </h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {!disUserEvents && (
              <div className="flex flex-col justify-center items-center w-full bg-white rounded-lg py-3 px-5 my-3">
                <h1 className="font-semibold text-lg">
                  Loading Your Events ...
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserPage;
