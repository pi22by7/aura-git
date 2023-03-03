import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCubesStacked,
  // faAddressCard,
  // faCube,
} from "@fortawesome/free-solid-svg-icons";

export const EventCard = ({ event }) => {
  // eslint-disable-next-line no-unused-vars
  const { id, title, club, description, _slugs, rules, team_size, rounds } =
    event;
  return (
    <div
      key={id}
      className="event grid rounded-lg m-5 lg:w-3/4 w-11/12 h-fit bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20"
    >
      {/* <div className="">
        <img
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt="EventArt"
          className="self-center h-full object-contain lg:pl-5 pl-0"
        />
      </div> */}
      <div className="event-info grid grid-cols-1 p-5 w-full md:text-left justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xl font-semibold">{club}</h3>
        <h3 className="text-xl mt-5 font-semibold">Description:</h3>
        <p className="text-justify ">{description}</p>
        <div className="grid md:grid-cols-3 place-items-center grid-cols-1 my-5">
          <div className="flex flex-col items-center py-1">
            <FontAwesomeIcon icon={faUsers} className="text-xl  text-black" />
            <h3 className="text-md font-bold my-2">Team Size</h3>
            <p className="text-lg font-semibold">{team_size ? team_size : 1}</p>
          </div>
          <div className="flex flex-col items-center py-1">
            <FontAwesomeIcon
              icon={faCubesStacked}
              className="text-xl  text-black"
            />
            <h3 className="text-md font-bold my-2">Rounds</h3>
            <p className="text-lg font-semibold">{rounds ? rounds : 1}</p>
          </div>
          <Link
            to={`/competitions/${_slugs.club}/${_slugs.title}`}
            className="my-auto place-self-end"
          >
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
