import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCubesStacked,
  faAddressCard,
  faCube,
} from "@fortawesome/free-solid-svg-icons";

const EventDetails = ({ event }) => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center">Event Details</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 my-5">
        <div className="flex flex-col items-center py-3">
          <FontAwesomeIcon
            icon={faUsers}
            className="text-3xl my-2 text-quaternary"
          />
          <h3 className="text-xl font-bold my-2">Team Size</h3>
          <p className="text-xl font-semibold">{event.team_size}</p>
        </div>
        <div className="flex flex-col items-center py-3">
          <FontAwesomeIcon
            icon={faCubesStacked}
            className="text-3xl my-2 text-quaternary"
          />
          <h3 className="text-xl font-bold my-2">Rounds</h3>
          <p className="text-xl font-semibold">{event.rounds}</p>
        </div>
        <div className="flex flex-col items-center py-3">
          <FontAwesomeIcon
            icon={faAddressCard}
            className="text-3xl my-2 text-quaternary"
          />
          <h3 className="text-xl font-bold my-2">Registration Limit</h3>
          <p className="text-xl font-semibold">
            {event.registration_limit ? event.registration_limit : "NA"}
          </p>
        </div>
      </div>
      <div className="py-5 md:w-4/5 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">Rules</h2>
        <ul className="flex flex-col items-start mb-5">
          {event.rules.map((rule, index) => (
            <li key={index} className="my-2 text-justify">
              <FontAwesomeIcon icon={faCube} className="mx-3" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventDetails;
