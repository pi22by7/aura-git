import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please enter all fields");
      return;
    }
    console.log(name, email, message);
    setLoading(true);
    setError("");
  };

  return (
    <div className="grid justify-items-center">
      <div className="rounded-lg grid justify-items-stretch p-5 lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Contact Us</h1>
        <p className="font-semibold text-md text-center m-2">
          We are here to help you
        </p>
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
              <label className="py-3 col-span-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="text"
                name="message"
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your Message"
              />
            </div>
            <div className="mt-8 mb-5">
              {/* <Link to="/user">Login</Link> */}
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Send Reset Link
              </button>
            </div>
          </form>
          {/* <div className="grid grid-cols-2">
            <Link className="col-span-1 justify-self-start" to="/signup">
              Signup
            </Link>
            <Link className="col-span-1 justify-self-end" to="/login">
              Login
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
