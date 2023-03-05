import { useUser } from "../../Contexts/userContext";
import { useEffect, useState } from "react";
import api from "../../Utils/axios.config";
const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [isNull, setNull] = useState(true);
  const evPart = `{${props.id}, ${props.title}}`;
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  useEffect(() => {
    console.log(user);
    if (user !== null) {
      setNull(false);
      team[0] = user.aura_id;
    } else {
      setNull(true);
    }
  }, [setNull, team, user]);

  const handleName = (e) => {
    setName(e);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...team];
    newInputs[index] = event.target.value;
    setTeam(newInputs);
    // console.log(team);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let ele = document.getElementById("msg");

    if (isNull === true) {
      ele.innerHTML = "You need to have an account to register for an event!";
    } else {
      ele.innerHTML = "Registrations will start on March 5th! :)";
      await api.post("/teams/createteam", {
        evPart,
        name,
        team,
      });
    }
  };
  // eslint-disable-next-line no-unused-vars
  //   const { setUser } = useUser();
  const n = props.size;
  // console.log(n);
  // const times = [...Array(n).keys()];
  const renderInputForms = (x) => {
    const inputForms = [];

    for (let i = 1; i < x; i++) {
      inputForms.push(
        <>
          <label className="py-3 col-span-1" htmlFor={`tm${i}`} key={i + 20}>
            Team Mate {i}
          </label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            key={i}
            value={team[i] || ""}
            onChange={(e) => handleInputChange(i, e)}
            disabled={false}
            required
            placeholder="Enter Teammate's Aura ID"
          />
        </>
      );
    }

    return inputForms;
  };

  return (
    <div className="align-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100">
      {n > 1 && (
        <>
          <h1 className="font-bold text-xl text-center m-2">
            Register your team
          </h1>
          <label className="py-3 col-span-1">Team Name</label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            onChange={(e) => handleName(e)}
            disabled={false}
            required
            placeholder="Enter Team Name"
          />
        </>
      )}
      {n === 1 && (
        <h1 className="font-bold text-xl text-center m-2">Register yourself</h1>
      )}
      <div>
        <form>
          <div className="grid grid-cols-1 my-1">{renderInputForms(n)}</div>
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
