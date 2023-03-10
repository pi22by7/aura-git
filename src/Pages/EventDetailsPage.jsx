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
  const [isLeader, setIsLeader] = useState(false);
  const [teamSub, setTeamSub] = useState(null);
  const [url, setUrl] = useState();
  const { user, setUser } = useUser();
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchEvent() {
      if (!uid) {
        await api.get("/auth/user/logout");
      }
      await api
        .get(`/events/${club}/${title}`)
        .then((res) => {
          const event = res.data.data.event;
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTeamSize(parseInt(event.team_size));
          setEvent(event);
          setSpecial(Boolean(event.link));
          setUrl(event.url);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            navigate("/404");
          } else {
            navigate("/competitions");
          }
        });
    }
    fetchEvent();
  }, [club, title, navigate, uid]);

  useEffect(() => {
    if (event) {
      getUsersTeams();
    }
  }, [event]);

  useEffect(() => {
    if (special) {
      getTeamSubmissions();
    }
  }, [team]);

  useEffect(() => {
    if (team && event) {
      const tm = event.registered_teams.find(
        (team) => team.team_id === team._id
      );
      if (tm && tm.payment.status) {
        setPaid(true);
      }
    }
  }, [team, event]);

  const getUsersTeams = async () => {
    await api
      .get(`/teams/user/${uid}`)
      .then((res) => {
        const teams = res.data.data.results;
        teams.map((team) => {
          if (team.event_participated.event_id === event._id) {
            setTeam(team);
            if (team !== null) {
              setRegistered(true);
              if (team.team_leader.id === uid) {
                setIsLeader(true);
              }
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTeamSubmissions = async () => {
    if (team.length === 0) return;
    const teamId = team[0].team_id;
    await api
      .get(`/submissions/team/${teamId}`)
      .then((res) => {
        setTeamSub(res.data.data.submission);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!event) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto pt-5">
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
              isLeader={isLeader}
              setRegistered={setRegistered}
              setPaid={setPaid}
              setTeam={setTeam}
              setIsLeader={setIsLeader}
              className="justify-center justify-self-center w-4 mb-12"
            />
          )}
          {special && registered && (
            <Submission
              event={event._id}
              user={uid}
              team={team[0]}
              teamSub={teamSub}
              setTeamSub={setTeamSub}
            />
          )}
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
