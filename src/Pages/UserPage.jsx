import { useState } from "react";

const UserPage = () => {
  const [user, setUser] = useState({
    name: "Test User",
    email: "pi@pi.com",
    bio: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet cumque officia veritatis commodi fugit expedita quos alias.",
    profileImage: "https://i.pravatar.cc/300",
  });
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  return (
    <div className="grid grid-cols-10 gap-2 justify-items-center">
      <div className="avatar col-span-4 col-start-2 col-end-3">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-44 h-44 rounded-full m-10"
        />
        <h2 className="text-2xl font-medium mb-5">{user.name}</h2>
        <p className="text-lg font-medium mb-2">{user.email}</p>
        <p className="text-lg font-medium">{user.bio}</p>
      </div>
      <div className="mt-20 info cols-span-6 col-start-4 col-end-9">
        <form className="">
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
          <button
            className="w-full mt-4 py-2 bg-secondary hover:bg-tertiary text-white font-medium rounded"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default UserPage;
