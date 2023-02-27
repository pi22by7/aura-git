import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../Utils/axios.config";
const PasswordEnter = () => {
  const [password, setPassword] = useState("");
  const [confPass, setconfPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password | !confPass) {
      setError("Please enter all fields");
      return;
    }
    if (password !== confPass) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    handleReset();
    // setError("");
    // setPassword("");
    // setconfPassword("");
  };
  async function handleReset() {
    try {
      const response = await api.post("/tickets/verification/password", {
        new_password: password,
      });
      console.log(response.data.msg);
    } catch (error) {
      console.log("Error Resetting Password.", error);
    }
  }

  return (
    <div className="grid justify-items-center v-screen w-screen">
      <div className="rounded-lg grid justify-items-stretch p-5 lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Reset Password</h1>
        <p className="font-semibold text-md text-center m-2">
          Please enter your new password:
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-green-500 text-center">Link Sent</p>}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Enter New Password
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
                placeholder="New Password"
              />
            </div>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Confirm Password
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="password"
                name="password"
                id="password"
                value={confPass}
                onChange={(e) => setconfPassword(e.target.value)}
                minLength="8"
                required
                placeholder="Confirm Password"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button
                className="btn btn-primary w-full"
                type="submit"
                onClick={handleSubmit}
              >
                Send Email Verification Link
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/signup">
              Signup
            </Link>
            <Link className="col-span-1 justify-self-end" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PasswordEnter;
