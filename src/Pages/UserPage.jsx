import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PaymentForm from "../Components/PaymentForm/PaymentForm";
import api from "../Utils/axios.config";
import PreLoader from "../Components/PreLoader/PreLoader";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(localStorage.getItem("uid"));
      await api
        .get(`/auth/user/${localStorage.getItem("uid")}`)
        .then((res) => {
          setUser(res.data.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  if (loading) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 lg:h-[100vh] h-fit place-items-center justify-items-center bg-profile lg:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-profilec py-5">
      <div className="lg:col-start-2 lg:col-span-2 grid lg:grid-cols-3 grid-cols-1 place-items-center w-4/5 p-5 rounded-lg bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
        <div className="col-span-1">
          <img
            src={
              user.profileImage
                ? user.profileImage
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrfDKCmowwSwdUfA3aL1jKQX_ALj1iLf4RIA1DG5FHQ&s"
            }
            alt="Profile"
            className="w-32 h-32 md:w-44 md:h-44 rounded-full m-4 max-w-none max-h-none"
          />
        </div>
        <div className="info lg:col-span-2 col-span-1 w-full">
          <h1 className="text-3xl">Your Profile</h1>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 my-1">
              <label className="py-3 col-span-1" htmlFor="name">
                Name
              </label>
              <input
                className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleInputChange}
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
                value={user.email}
                onChange={handleInputChange}
                required
                placeholder="Your Email"
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
                value={user.usn}
                onChange={handleInputChange}
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
                value={user.college}
                onChange={handleInputChange}
                required
                placeholder="Your College"
              />
            </div>
            <button className="w-full mt-4 py-2 btn btn-primary" type="submit">
              Save
            </button>
            <Link to="/forgot-password/change">
              <button
                className="w-full mt-4 py-2 btn btn-primary"
                type="submit"
              >
                Change Password
              </button>
            </Link>
          </form>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};
export default UserPage;
