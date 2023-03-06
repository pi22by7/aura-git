import api from "../../Utils/axios.config";
import { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

const Changed = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("token"));
  // console.log(searchParams.get("target"));
  let api_url;

  async function onSuccess() {
    if (location === "/verifyPass") {
      api_url = `/tickets/verification/password/resolve?token=${searchParams.get(
        "token"
      )}&target=${searchParams.get("target")}`;
    } else if (location === "/verifyEmail") {
      api_url = `/tickets/verification/email/resolve?token=${searchParams.get(
        "token"
      )}`;
    }
    await api
      .get(api_url)
      .then((res) => {
        return navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Link");
      });
  }
  return (
    <div className="grid form-container bg-signin bg-signinc w-screen ">
      <div className="form-box bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 md:mr-64">
        <h1 className="font-bold text-xl text-center m-2">
          {location === "/verifyPass" ? "Verify Password" : "Verify Email"}
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
