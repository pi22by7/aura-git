import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../Utils/axios.config";
import { useUser } from "../../Contexts/userContext";
import colleges from "../../Dataset/collegesKar.json";

const collegesList = colleges.map((college, index) => (
  <option key={index} value={college.college}>
    {college.college.length < 30
      ? college.college
      : college.college.substring(0, 30) + "..."}
  </option>
));

const Signup = () => {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !usn || !college || !phone) {
      setError("Please enter all fields");
      return;
    }
    setError("");
    setLoading(true);
    handleSignUp();
  };

  const handleSignUp = async () => {
    try {
      await api
        .post("/auth/user/signup", {
          name,
          phone,
          email,
          password,
          usn,
          college,
        })
        .then((res) => {
          if (res.data.data.user) {
            setMessage("A verification E-mail has been sent to your mail.");
            window.scrollTo(0, 0);
            setLoading(false);
            setError("");
            setEmail("");
            setPhone("");
            setPassword("");
            setName("");
            setCollege("");
            setUsn("");
          } else {
            setLoading(false);
            setError("Something Went Wrong");
          }
        });
    } catch (error) {
      setLoading(false);
      if (
        error.response.status === 400 &&
        error.response.data.error === "400-invalidEmail"
      ) {
        setError("Invalid Email");
      } else if (
        error.response.status === 403 &&
        error.response.data.error === "403-emailAlreadyInUse"
      ) {
        setError("Email Already In Use");
      } else {
        setError("Something Went Wrong");
      }
    }
  };

  return (
    <div className="form-container bg-signin bg-signinc w-screen">
      <div className="form-box bg-slate-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-black-100 overflow-hidden md:mr-64 place-self-center">
        <h1 className="font-bold text-xl text-center m-2">Signup</h1>
        {loading && <p className="text-green-500 text-center">Verifying</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
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
            {/* Phone */}
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="phone">
                Phone
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Your Phone Number"
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
                list="colleges"
              />
              <datalist id="colleges">{collegesList}</datalist>
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
              <p className="text-blue-600 text-center text-sm pb-2">
                A verification E-mail will be sent on signup. Please verify to
                login.
              </p>

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
