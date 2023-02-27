/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Utils/axios.config";
import EventDetails from "../Components/EventDetails/EventDetails";
import EventCoordinators from "../Components/EventCoords/EventCoords";
import PreLoader from "../Components/PreLoader/PreLoader";
import TeamRegister from "../Components/TeamRegister/TeamRegister";

const EventsDetailsPage = () => {
  const eventId = useParams().id;
  const [teamSize, setTeamSize] = useState(0);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await api.get(`/events/${eventId}`);
        console.log(response.data.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTeamSize(parseInt(response.data.data.event.team_size));
        setEvent(response.data.data.event);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvent();
  }, [eventId]);
  const handleRegister = () => {
    return null;
  };

  if (!event) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto">
      <div className="w-full">
        <img
          className="w-full h-1/4 object-cover rounded-lg shadow-2xl"
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt={`${event.title}-banner`}
        />
      </div>
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
        <EventCoordinators eventCoordinators={event.event_coordinators} />
        <p className="text-xl text-center font-bold my-5">
          Orgainzed By: {event.club}
        </p>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
