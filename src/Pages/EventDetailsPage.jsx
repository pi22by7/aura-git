/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useUser } from "../Contexts/userContext";
import {
  useParams,
  useNavigate,
  isRouteErrorResponse,
  Link,
} from "react-router-dom";
import api from "../Utils/axios.config";
import EventDetails from "../Components/EventDetails/EventDetails";
import EventCoordinators from "../Components/EventCoords/EventCoords";
import PreLoader from "../Components/PreLoader/PreLoader";
import TeamRegister from "../Components/TeamRegister/TeamRegister";
import Submission from "../Components/TeamRegister/Submissions";

const EventsDetailsPage = () => {
  const { club, title } = useParams();
  const [teamSize, setTeamSize] = useState(0);
  const [event, setEvent] = useState(null);
  const [special, setSpecial] = useState();
  const [registered, setRegistered] = useState(false);
  const [paid, setPaid] = useState(false);
  const [url, setUrl] = useState();
  const { user, setUser } = useUser();
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  let team = null;

  useEffect(() => {
    async function fetchEvent() {
      if (!uid) {
        await api.get("/auth/user/logout");
      }
      await api
        .get(`/events/${club}/${title}`)
        .then((res) => {
          console.log(res);
          const event = res.data.data.event;
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTeamSize(parseInt(event.team_size));
          setEvent(event);
          setSpecial(Boolean(event.link));
          setUrl(event.url);
          team = event.registered_teams.filter(
            (team) => team.leader_id === uid
          );
          if (team !== null && team.length > 0) {
            setRegistered(true);
            if (team[0].payment.status) {
              setPaid(true);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status === 404) {
            navigate("/404");
          } else {
            navigate("/competitions");
          }
        });
    }
    fetchEvent();
  }, [club, title, navigate, special, url]);

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
      <div className="mt-10 w-full">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-lg text-justify my-5">{event.description}</p>
        <EventDetails event={event} />
        <div className="grid grid-cols-1 place-items-center my-10">
          {!user && (
            <>
              <p className="text-xl text-center font-bold my-5">
                Please login to register for the event
              </p>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}
          {user && (
            <TeamRegister
              size={teamSize}
              min_size={event.min_team_size ? event.min_team_size : 1}
              title={event.title}
              id={event._id}
              registered={registered}
              paid={paid}
              setRegistered={setRegistered}
              setPaid={setPaid}
              className="justify-center justify-self-center w-4 mb-12"
            />
          )}
          {special && registered && <Submission event={event._id} user={uid} />}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 underline text-blue-500"
            >
              Pre-pitch round form.
            </a>
          )}
        </div>
        {event.event_coordinators.length !== 0 && (
          <EventCoordinators eventCoordinators={event.event_coordinators} />
        )}
        <p className="text-xl text-center font-bold my-5">
          Organized By: {event.club}
        </p>
      </div>
    </div>
  );
};

export default EventsDetailsPage;
