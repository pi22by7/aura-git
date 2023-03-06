import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../Contexts/userContext";
// import { useCookies } from "react-cookie";
// import axios from "axios";
import api from "../../Utils/axios.config";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [cookies, setCookie] = useCookies(["user"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter all fields");
      return;
    }
    setError("");
    setLoading(true);
    handleLogin();
  };

  const handleEmailVerification = async () => {
    await api
      .get(`/tickets/verification/email?email=${email}`)
      .then((res) => {
        if (res.data.success)
          setMessage("A verification E-mail has been sent to your mail.");
      })
      .catch((err) => {
        if (
          err.response.status === 400 &&
          err.response.data.error === "400-emailAlreadySent"
        )
          setMessage(
            "Verification E-mail already sent. Please check your mail."
          );
        else setError("Something went wrong. Please try again later.");
      });
  };

  const handleLogin = async () => {
    try {
      await api
        .post("/auth/user/login", {
          email,
          password,
        })
        .then((res) => {
          setUser(res.data.data.user);
          setLoading(false);
          setError("");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      setLoading(false);
      if (
        error.response.status === 400 &&
        error.response.data.error === "404-userNotFound"
      ) {
        setError("E-mail Not Registered");
      } else if (
        error.response.status === 400 &&
        error.response.data.error === "403-emailUnverified"
      ) {
        handleEmailVerification();
        setError("E-mail Not Verified.");
      } else {
        setError("Invalid Credentials");
      }
    }
  };

  return (
    <div className="grid form-container bg-signin bg-signinc w-screen user-none">
      <div className="form-box bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 md:mr-64">
        <h1 className="font-bold text-xl text-center m-2">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        {loading && <p className="text-green-500 text-center">Verifying</p>}
        <div>
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
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="password">
                Password
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
                placeholder="Your Password"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button className="btn btn-primary w-full" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/signup">
              New? Signup here!
            </Link>
            <Link className="col-span-1 justify-self-end" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
