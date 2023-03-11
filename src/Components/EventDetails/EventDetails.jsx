import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCubesStacked,
  faAddressCard,
  faCube,
} from "@fortawesome/free-solid-svg-icons";

function parseLinks(strings) {
  const linkRegex = /(https?:\/\/[^\s]+)/g; // regular expression to match URLs
  return strings.map((str) => {
    const matches = str.match(linkRegex);
    if (matches) {
      const parts = str.split(linkRegex);
      return parts.map((part, index) => {
        if (matches.includes(part)) {
          return (
            <a
              className="text-blue-500"
              key={index}
              href={part}
              target="_blank"
              rel="noreferrer"
            >
              {part}
            </a>
          );
        } else {
          return part;
        }
      });
    } else {
      return str;
    }
  });
}

const EventDetails = ({ event }) => {
  const rules = parseLinks(event.rules);
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
          <p className="text-sm mt-1">(Min Team Size {event.min_team_size})</p>
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
            {parseInt(event.registration_limit)
              ? event.registration_limit
              : "NA"}
          </p>
          <p className="text-sm mt-1">
            {parseInt(event.registration_limit)
              ? (event.registration_limit - event.registered_teams.length < 20 ? `(Available Slots ${event.registration_limit - event.registered_teams.length
                })` : null)
              : null}
          </p>
        </div>
      </div>
      <div className="py-5 md:w-4/5 w-11/12 mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">Rules</h2>
        <ul className="flex flex-col items-start mb-5">
          {rules.map((rule, index) => (
            <li key={index} className="my-2 text-justify">
              <FontAwesomeIcon icon={faCube} className="mx-3" />
              {rule}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-center">
        {event.team_size > 1 ? "Team" : "Individual"} Registration Fees
      </h2>
      <p className="w-fit text-white text-2xl text-center my-5 rounded-full py-2 px-5 bg-primary mx-auto">
        &#8377; {event.team_size > 1 ? "250" : "50"}
      </p>
    </div>
  );
};

export default EventDetails;
