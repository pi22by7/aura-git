import { useUser } from "../../Contexts/userContext";
import { useEffect, useState } from "react";
// import Razorpay from "razorpay";
import api from "../../Utils/axios.config";
import { successToast, errorToast } from "../../Utils/Toasts/Toasts";
// import logo from "../../Assets/logo.png";
import errors from "../../Utils/error.codes.json";
import { redirect } from "react-router-dom";
import payqr from "../../Assets/qr.png";

const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transID, setTransaction] = useState("");
  const event_participated = {
    event_id: props.id,
    event_title: props.title,
  };
  const teamSize = props.size;
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();

  const handleInputChange = (index, event) => {
    const newInputs = [...team];
    newInputs[index] = String(event.target.value).trim();
    let p = /^AURA23-[A-Z]{3}-[0-9]{5}$/;
    if (!p.test(newInputs[index]))
      errorToast("Invalid AURA ID: Format is AURA23-XXX-12345");
    else setTeam(newInputs);
  };

  const registerTeam = async () => {
    // e.preventDefault();
    if (name === "") {
      setError("Please enter team name");
      return;
    }
    if (team.length < props.min_size - 1) {
      setError(`Team size should be atleast ${props.min_size}`);
      return;
    }
    setLoading(true);
    const team_name = name;
    const team_members = team;
    const data = {
      event_participated,
      team_name,
      team_members,
    };
    await api
      .post("/teams/createteam", data)
      .then((res) => {
        setMessage("Team Registered Successfully!");
        setError("");
        setLoading(false);
        props.setRegistered(true);
        props.setTeam(res.data.data.team);
        props.setIsLeader(true);
        successToast(
          props.size > 1
            ? "You have successfully registered your team!"
            : "You have successfully registered for the event"
        );
      })
      .catch((err) => {
        console.log(err);
        let err_status = err.response.status;
        let err_code = err.response.data.error;
        setLoading(false);
        if (err_status === 400) {
          if (err_code === errors[400].eventDetailsRequired) {
            setError("Event Details Required!");
          }
          if (err_code === errors[400].teamNameRequired) {
            setError("Team Name Required!");
          }
          if (err_code === errors[400].minTeamSize) {
            setError("Minimum Team Size Required!");
          }
        } else if (err_status === 401) {
          if (
            err_code === errors[401].authRequired ||
            err_code === errors[401].invalidOrExpiredToken
          ) {
            setError(
              "You are not authorized to perform this operation. Please login and try again."
            );
            setTimeout(() => {
              redirect("/login");
            }, 3000);
          }
        } else if (err_status === 403) {
          if (err_code === errors[403].teamMemberEmailUnverified) {
            setError(
              "One or more team members have not verified their email address. Please ask them to verify their email address and try again."
            );
          }
          if (err_code === errors[403].invalidOperation) {
            setError("You cannot add yourself as a team member!");
          }
          if (err_code === errors[403].teamMemberAlreadyRegistered) {
            setError(
              "One or more team members have already registered for another team!"
            );
          }
          if (err_code === errors[403].eventAlreadyRegistered) {
            setError("You have already registered for this event!");
          }
        } else if (err_status === 404) {
          if (err_code === errors[404].userNotFound) {
            setError("One or more team members are not registered!");
          }
        } else {
          setError("Team Registration Failed!");
        }
      });
  };
  const n = props.size;
  const pay = () => {
    let t = /^[a-z-0-9]+$/i;
    if (transID === "") {
      errorToast("Please enter transaction ID");
      return;
    } else if (!t.test(transID)) {
      api
        .post(`/receipts`, {
          team_id: props.team._id,
          transaction_id: transID,
        })
        .then((res) => {
          successToast(
            "Your payment has been recorded. Please make sure that you also submit the form to complete your registration. https://forms.gle/L9iwR3HBoTXmbK687"
          );

          setTimeout(
            () => window.open("https://forms.gle/BSBtcqeEYfZWqo4Y9", "_blank"),
            1000
          );

          props.setPaid(true);
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
          errorToast("Failed to record payment");
        });
    } else {
      errorToast("The Transaction ID was invalid.");
    }
  };
  const renderInputForms = (x) => {
    const inputForms = [];

    for (let i = 0; i < x - 1; i++) {
      inputForms.push(
        <>
          <label className="py-3 col-span-1" htmlFor={`tm${i}`} key={i + 20}>
            Team Mate {i + 1}
          </label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            id={`tm${i}`}
            key={i + 1}
            value={team[i] || ""}
            onChange={(e) => handleInputChange(i, e)}
            disabled={false}
            required
            placeholder="Enter Teammate's Aura ID"
          />
        </>
      );
    }

    return inputForms;
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Pay Now</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <img
                    src={payqr}
                    alt="qr code for payment"
                    className="justify-center mx-auto"
                  />
                  <p className="my-4 text-blue-600 text-md">
                    Please open your preferred payment app and please pay{" "}
                    <strong className="highlight">
                      ₹{teamSize === 1 ? "50" : "250"}
                    </strong>{" "}
                    by scanning the QR code displayed above.
                  </p>
                  <input
                    className="bg-gray-100 w-full rounded-lg p-2 col-span-1 outline-none my-3"
                    type="text"
                    name="transactionID"
                    id="txnID"
                    onChange={(e) => setTransaction(e.target.value)}
                    required
                    placeholder="Enter Transaction ID"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => pay()}
                  >
                    Next (Redirects to Google Forms)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {!props.registered && (
        <p className="text-blue-600 text-center py-2">
          One who registers is the team leader and is already included in the
          team.
        </p>
      )}
      <div className="align-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100">
        {error && <p className="msg-box text-red-500 text-center">{error}</p>}
        {message && (
          <p className="msg-box text-green-500 text-center">{message}</p>
        )}
        {loading && (
          <p className="msg-box text-green-500 text-center">Processing...</p>
        )}
        {!props.registered && (
          <>
            <h1 className="font-bold text-xl text-center m-2">
              {n > 1 ? "Register your team" : "Register yourself"}
            </h1>
            {props.min_size > 1 && (
              <p className="text-center text-black">
                Team size should be atleast {props.min_size}
              </p>
            )}
            <label className="py-3 col-span-1">Team Name</label>
            <input
              className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={false}
              required
              placeholder="Enter Team Name"
            />
            <label className="py-3 col-span-1">Team Leader</label>
            <input
              className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
              value={user.aura_id}
              disabled
              required
              placeholder="Enter Team Name"
            />
            <div>
              <form>
                <div className="grid grid-cols-1 my-1">
                  {renderInputForms(n)}
                </div>
                {n > 0 && (
                  <div className="grid justify-center my-8">
                    <button
                      className="btn btn-primary row-start-2 justify-self-center"
                      onClick={registerTeam}
                      disabled={loading}
                    >
                      Register
                    </button>
                  </div>
                )}
                {/* {console.log(team, Mem)} */}
              </form>
            </div>
          </>
        )}
        {props.registered && !props.paid && props.isLeader && (
          <>
            <h1 className="font-bold text-xl text-center m-2">
              Pay the registration fee
            </h1>
            <p className="text-center text-sm text-blue-600">
              Your team has been registered. Pay to confirm your registration.
            </p>
            {/* <p className="text-center text-sm text-red-600">
              You will be notified once the payment starts. Updates will be
              updated on the{" "}
              <a
                href="/#/news"
                className="text-blue-500 font-sem
              "
              >
                News
              </a>{" "}
              tab
            </p> */}
            <div className="grid justify-center my-8">
              <button
                className="btn btn-primary row-start-2 justify-self-center"
                onClick={() => setShowModal(true)}
              >
                Pay
              </button>
            </div>
          </>
        )}
        {props.registered && !props.paid && !props.isLeader && (
          <>
            <h1 className="font-bold text-xl text-center m-2">
              Your team has been registered. <br /> waiting for the team leader
              to pay the registration fee.
            </h1>
            <p className="text-center text-sm text-blue-600">
              Only the team leader can pay the registration fee.
            </p>
          </>
        )}
        {props.paid && (
          <>
            <h1 className="font-bold text-xl text-center m-2">
              You have Successfully Registered for the Event 😎!
            </h1>
            <p className="text-center text-sm text-blue-600">
              Please make sure that you have filled the form after completing
              your payment for this event (
              <a
                href="https://forms.gle/BSBtcqeEYfZWqo4Y9"
                target="_blank"
                rel="noreferrer"
              >
                https://forms.gle/BSBtcqeEYfZWqo4Y9
              </a>
              ).
            </p>
            <br />
            <p className="text-center text-sm text-blue-600">
              Your payments will be verified and in case of any fraudaulent
              actions, your team will be disqualified.
            </p>
          </>
        )}
      </div>
    </>
  );
};
export default TeamRegister;
