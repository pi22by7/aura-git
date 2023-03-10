import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Utils/axios.config";
import QRCode from "react-qr-code";
import PreLoader from "../Components/PreLoader/PreLoader";
import colleges from "../Dataset/collegesKar.json";

const collegesList = colleges.map((college) => (
  <option value={college.college}>{college.college}</option>
));

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [paidFor, setPaidFor] = useState([]);
  const [dispPay, setDispPay] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
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

  useEffect(() => {
    const participated = async () => {
      let res = await api.get(`/users/${user._id}`);
      setPaidFor(res.data.data.paid_for[0]);
      for (let i = 0; i < paidFor.length; i++) {
        let res2 = await api.get(`/events/${paidFor[i]}`);
        setDispPay((oldArray) => [...oldArray, res2]);
      }
      // return res.data.data.paid_for;
    };
    participated();
  });

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
          onClick={() => setActiveTab("events")}
        >
          My Events
        </button>
      </div>
      {activeTab === "profile" && (
        <div className="lg:col-start-2 lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 place-items-center md:w-4/5 w-11/12 p-5 rounded-lg bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
          <div className="col-span-1 grid">
            <QRCode
              value={user}
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
              Aura ID:
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
            <div>
              {dispPay &&
                dispPay.map((event) => (
                  <div key={event.id} className="event">
                    <h2>{event.title}</h2>
                    {/* <p>{event.date}</p> */}
                  </div>
                ))}
            </div>
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
        <div className="h-[100vh] lg:col-start-2 lg:col-span-2 grid grid-cols-1 place-items-center md:w-4/5 w-11/12 p-5 rounded-lg bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
          <h1 className="text-3xl lg:text-left text-center">Your Events</h1>
          <div className="h-full overflow-scroll [&::-webkit-scrollbar]:hidden mt-10">
            {/* Add your events here */}
            Updating soon
          </div>
        </div>
      )}
    </div>
  );
};
export default UserPage;
