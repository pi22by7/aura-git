import { useState } from "react";

const UserPage = () => {
  const [user, setUser] = useState({
    name: "Test User",
    email: "pi@pi.com",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet cumque officia veritatis commodi fugit expedita quos alias.",
    profileImage: "https://i.pravatar.cc/350",
  });
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-10 justify-items-center">
      <div className="col-span-1 md:col-span-4 md:col-start-2 md:col-end-3 pl-4 pr-2">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-32 h-32 md:w-44 md:h-44 rounded-full m-4 max-w-none max-h-none"
        />
        <h2 className="text-2xl font-medium mb-5">{user.name}</h2>
        <p className="text-lg font-medium mb-2">{user.email}</p>
        <p className="text-lg font-medium">{user.bio}</p>
      </div>
      <div className="mt-16 info md:cols-span-6 md:col-start-4 md:col-end-9 pr-4">
        <h1 className="text-3xl">Your Profile</h1>
        <br />
        <hr />
        <br />
        <form className="mt-4">
          <label className="mb-2 font-medium" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
          <label className="mb-2 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full p-2 border rounded"
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <label className="mb-2 font-medium" htmlFor="bio">
            Bio:
          </label>
          <textarea
            className="w-full p-2 border rounded"
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
          />
          <button className="w-full mt-4 py-2 btn btn-primary" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default UserPage;
