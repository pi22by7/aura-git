// import { useUser } from "../../Contexts/userContext";

import { useState } from "react";
import api from "../../Utils/axios.config";
// import { useState } from "react";
const Submission = (props) => {
  const [link, setLink] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    console.log(link);
    setLink(e);
  };
  const event = props.event;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/submissions", {
      event,
      link,
    });
    console.log(link, res);
  };

  return (
    <div className="lign-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 my-10">
      <h1 className="font-bold text-xl text-center m-2">Your Submission</h1>
      <div>
        <form>
          <div className="grid grid-cols-1 my-1">
            <label className="py-3 col-span-1" htmlFor="submission">
              Submission
            </label>

            <input
              className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
              type="text"
              name="submission"
              id="submission"
              onChange={(e) => handleInputChange(e)}
              disabled={false}
              required
              placeholder="Enter G-Drive Link"
            />
            <p className="text-sm pt-4">
              Please make sure the drive access is public
            </p>
          </div>
          <div className="grid justify-center my-8">
            <button
              className="btn btn-primary row-start-2 justify-self-center"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Submission;
