import { Link } from "react-router-dom";
import { useState } from "react";
const Signup = () => {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !usn) {
      setError("Please enter all fields");
      return;
    }
    setLoading(true);
    setError("");
  };

  return (
    <div className="grid justify-items-center">
      <div className="rounded-lg grid justify-items-stretch p-5 lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Signup</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-green-500 text-center">Verifying</p>}
        <div>
          <form>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="name">
                Name
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your Name"
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
                onChange={(e) => setUsn(e.target.value)}
                required
                placeholder="Your USN"
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
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Your Password"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Signup
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/login">
              Login
            </Link>
            <Link className="col-span-1 justify-self-end" to="/forgot-password">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex justify-center mt-14">
    //   <div className="rounded-lg flex flex-col p-5 w-1/4 shadow-xl">
    //     <h1 className="font-bold text-xl text-center m-2">Sign Up</h1>
    //     {error && <p className="text-red-500 text-center">{error}</p>}
    //     {loading && <p className="text-green-500 text-center">Verifying</p>}
    //     <div>
    //       <form>
    // <div className="flex flex-col my-1">
    //   <label className="py-3" htmlFor="name">
    //     Name
    //   </label>
    //   <input
    //     className="bg-gray-100 rounded-lg p-2"
    //     type="text"
    //     name="name"
    //     id="name"
    //     onChange={(e) => setName(e.target.value)}
    //     required
    //     placeholder="Your Name"
    //   />
    // </div>
    // <div className="flex flex-col my-1">
    //   <label className="py-3" htmlFor="usn">
    //     USN
    //   </label>
    //   <input
    //     className="bg-gray-100 rounded-lg p-2"
    //     type="text"
    //     name="usn"
    //     id="usn"
    //     onChange={(e) => setUsn(e.target.value)}
    //     required
    //     placeholder="Your USN"
    //   />
    // </div>
    //         <div className="flex flex-col my-1">
    //           <label className="py-3" htmlFor="email">
    //             Email
    //           </label>
    //           <input
    //             className="bg-gray-100 rounded-lg p-2"
    //             type="email"
    //             name="email"
    //             id="email"
    //             onChange={(e) => setEmail(e.target.value)}
    //             required
    //             placeholder="Your Email"
    //           />
    //         </div>
    //         <div className="flex flex-col my-1">
    //           <label className="py-3" htmlFor="password">
    //             Password
    //           </label>
    //           <input
    //             className="bg-gray-100 rounded-lg p-2"
    //             type="password"
    //             name="password"
    //             id="password"
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //             placeholder="Your Password"
    //           />
    //         </div>
    //         <div className="flex justify-center mt-8 mb-5">
    //           <button className="btn w-full" onClick={handleSubmit}>
    //             Sign Up
    //           </button>
    //         </div>
    //       </form>
    //       <div className="flex justify-between">
    //         <Link to="/login">Login</Link>
    //         <Link to="/forgot-password">Forgot Password</Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
