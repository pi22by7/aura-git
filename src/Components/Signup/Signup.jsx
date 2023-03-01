import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../Utils/axios.config";
import { useUser } from "../../Contexts/userContext";

const Signup = () => {
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !usn || !college) {
      setError("Please enter all fields");
      return;
    }
    setLoading(true);
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      const response = await api
        .post("/auth/user/signup", {
          name,
          email,
          password,
          usn,
          college,
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("uid", res.data.data.user);
          setUser({ id: res.data.data.user, email, password });
          setLoading(false);
          setError("");
          setEmail("");
          setPassword("");
          setName("");
          setUsn("");
        });
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="form-container bg-signin bg-signinc w-screen">
      <div className="form-box bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-black-100 overflow-hidden md:mr-64 place-self-center">
        <h1 className="font-bold text-xl text-center m-2">Signup</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-green-500 text-center">Verifying</p>}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="name">
                Name
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
              />
            </div>
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
              <label className="py-3 col-span-1" htmlFor="usn">
                University Number
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="text"
                name="usn"
                id="usn"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
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
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
                placeholder="Your College Name"
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
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button className="btn btn-primary w-full" type="submit">
                Signup
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/login">
              Already have an account? Login
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

export default Signup;
