import { Link } from "react-router-dom";
import { useState } from "react";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter all fields");
      return;
    }
    setLoading(true);
    setError("");
    setEmail("");
  };

  return (
    <div className="grid justify-items-center">
      <div className="rounded-lg grid justify-items-stretch p-5 lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Reset Password</h1>
        <p className="font-semibold text-md text-center m-2">
          We will send you a reset link to your registered email
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-green-500 text-center">Verifying</p>}
        <div className="grid">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="email">
                Email
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your Email"
              />
            </div>
            <div className="grid mt-8 mb-5 justify-center">
              {/* <Link to="/user">Login</Link> */}
              <Link
                to="/forgot-password/change"
                className="btn btn-primary w-full"
                type="submit"
              >
                Set a New Password
              </Link>
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
export default ForgotPassword;
