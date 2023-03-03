/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Utils/axios.config";
import EventDetails from "../Components/EventDetails/EventDetails";
import EventCoordinators from "../Components/EventCoords/EventCoords";
import PreLoader from "../Components/PreLoader/PreLoader";
import TeamRegister from "../Components/TeamRegister/TeamRegister";

const EventsDetailsPage = () => {
  const { club, title } = useParams();
  const [teamSize, setTeamSize] = useState(0);
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvent() {
      await api
        .get(`/events/${club}/${title}`)
        .then((res) => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTeamSize(parseInt(res.data.data.event.team_size));
          setEvent(res.data.data.event);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            navigate("/404");
          } else {
            navigate("/events");
          }
        });
    }
    fetchEvent();
  }, [club, title]);
  const handleRegister = () => {
    return null;
  };

  if (!event) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto pt-5">
      {/* <div className="w-full">
        <img
          className="w-full h-1/4 object-cover rounded-lg shadow-2xl"
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt={`${event.title}-banner`}
        />
      </div> */}
      <div className="mt-10">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-lg text-justify my-5">{event.description}</p>
        <EventDetails event={event} />
        <div className="grid justify-center my-8">
          {teamSize > 1 && (
            <TeamRegister
              size={teamSize}
              className="row-start-1 justify-center"
            />
          )}
          <button
            className="btn btn-primary row-start-2 justify-self-center"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        {event.event_coordinators.length !== 0 && (
          <EventCoordinators eventCoordinators={event.event_coordinators} />
        )}
        <p className="text-xl text-center font-bold my-5">
          Orgainzed By: {event.club}
        </p>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
