// import { useUser } from "../../Contexts/userContext";
import { useState } from "react";
const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [Mem, setMem] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setMem(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setTeam([...team, Mem]);
    // setMem("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let ele = document.getElementById("msg");
    ele.innerHTML = "Registrations will start on March 5th! :)";
  };
  // eslint-disable-next-line no-unused-vars
  //   const { setUser } = useUser();
  const n = props.size;
  console.log(n);
  const times = [...Array(n).keys()];
  return (
    <div className="lign-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100">
      <h1 className="font-bold text-xl text-center m-2">Register your team</h1>
      <div>
        <form>
          {/* {console.log("huh", props.size)} */}
          {times.map((i) => {
            return (
              <div className="grid grid-cols-1 my-1">
                <label
                  className="py-3 col-span-1"
                  htmlFor={`tm${i + 1}`}
                  key={i}
                >
                  Team Mate {i + 1}
                </label>
                <input
                  className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
                  type={`tm${i + 1}`}
                  name={`tm${i + 1}`}
                  id={`tm${i + 1}`}
                  key={i.id}
                  onChange={handleInputChange}
                  onBlur={handleRegister}
                  disabled={false}
                  // onBlur={(e) => setTeam((arr) => [...arr, e.target.value])}
                  required
                  placeholder="Enter Teammate's UserID"
                />
              </div>
            );
          })}
          {n > 0 && (
            <div className="grid justify-center my-8">
              <p id="msg" className="my-2"></p>
              <button
                className="btn btn-primary row-start-2 justify-self-center"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
          )}
          {/* {console.log(team, Mem)} */}
        </form>
      </div>
    </div>
  );
};
export default TeamRegister;
