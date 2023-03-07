// import { useUser } from "../../Contexts/userContext";

import { useState } from "react";
import api from "../../Utils/axios.config";
// import { useState } from "react";
const Submission = (props) => {
  const [link, setLink] = useState("");
  const [submission, setSubmission] = useState("");
  const event = props.event;
  console.log(event);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (link === "") {
      setSubmission("Please enter a valid link");
      return;
    }
    setSubmission("Submitting...");
    await api
      .post("/submissions", {
        event_id: event,
        links: [link],
        team_id: props.team._id,
      })
      .then((res) => {
        setSubmission("Submitted Successfully");
      })
      .catch((err) => {
        setSubmission("Submission Failed");
        console.log(err);
      });
  };

  return (
    <div className="lign-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 my-10">
      <h1 className="font-bold text-xl text-center m-2">Your Submission</h1>
      {submission && (
        <p className="msg-box text-green-500 text-center">{submission}</p>
      )}
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
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
