import api from "../../Utils/axios.config";
import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  successToast,
  errorToast,
  messageToast,
} from "../../Utils/Toasts/Toasts";

const Changed = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [searchParams] = useSearchParams();
  let api_url;
  let msg;

  async function onSuccess() {
    if (location === "/verifyPass") {
      api_url = `/tickets/verification/password/resolve?token=${searchParams.get(
        "token"
      )}&target=${searchParams.get("target")}`;
      msg = "Password Changed Successfully";
    } else if (location === "/verifyEmail") {
      api_url = `/tickets/verification/email/resolve?token=${searchParams.get(
        "token"
      )}`;
      msg = "Email Verified Successfully";
    }
    await api
      .get(api_url)
      .then((res) => {
        successToast(msg);
        return navigate("/login");
      })
      .catch((err) => {
        errorToast("The link has expired.");
        messageToast(
          "To generate a new link, please login again with your credentials. A new link will be sent to your mail."
        );
        setError("Invalid Link");
      });
  }
  return (
    <div className="grid form-container bg-signin bg-signinc w-screen ">
      <div className="form-box bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 md:mr-64">
        <h1 className="font-bold text-xl text-center m-2">
          {location === "/verifyPass" ? "Verify Password" : "Verify Email"}
        </h1>
        {error && <p className="msg-box text-red-500 text-center">{error}</p>}
        <p className="font-semibold text-md text-center m-2">
          {location === "/verifyPass"
            ? "Click to verify password change."
            : "Click to verify email"}
        </p>
        <button className="btn bg-primary" onClick={onSuccess}>
          Verify
        </button>
      </div>
    </div>
  );
};
export default Changed;
