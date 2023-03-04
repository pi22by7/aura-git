import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const EventCoordinators = ({ eventCoordinators }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Event Coordinators</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center mt-8">
        {eventCoordinators.map((eventCoordinator, index) => (
          <div key={index} className="flex flex-col items-center my-5">
            {console.log(eventCoordinator.image)}
            <img
              className="w-36 h-36 object-cover object-top rounded-full shadow-2xl"
              src={eventCoordinator.image}
              alt={eventCoordinator.name}
            />
            {/* {console.log(eventCoordinator.image)} */}
            <p className="font-semibold text-xl my-2">
              {eventCoordinator.name}
            </p>
            <p className="font-semibold text-md mt-1 cursor-pointer">
              <a
                href={`https://wa.me/91${eventCoordinator.contact_number}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faPhone} className="mx-2" />
                {eventCoordinator.contact_number}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCoordinators;
