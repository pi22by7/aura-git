import { useState } from "react";
import { EventCard } from "../Components/EventCard/EventCard";

const events = {
  Drama: [
    {
      title: "Play Production",
      club: "Drama",
      description: "A stage performance of a play.",
    },
    {
      title: "One-Act Play",
      club: "Drama",
      description: "A stage performance of a one-act play.",
    },
    {
      title: "Improvisation Workshop",
      club: "Drama",
      description: "A workshop to improve improvisation skills for actors.",
    },
    {
      title: "Monologue Competition",
      club: "Drama",
      description: "A competition for actors to perform a monologue.",
    },
    {
      title: "Theater Critique",
      club: "Drama",
      description: "A discussion and critique of a theater production.",
    },
  ],
  Photography: [
    {
      title: "Photography Contest",
      club: "Photography",
      description: "A photography competition with different categories.",
    },
    {
      title: "Landscape Photography Exhibition",
      club: "Photography",
      description: "An exhibition of landscape photographs.",
    },
    {
      title: "Portrait Photography Workshop",
      club: "Photography",
      description: "A workshop for portrait photography techniques.",
    },
    {
      title: "Street Photography Walk",
      club: "Photography",
      description: "A walk to capture street photographs.",
    },
    {
      title: "Black and White Photography Challenge",
      club: "Photography",
      description: "A photography challenge with only black and white photos.",
    },
  ],
  Music: [
    {
      title: "Concert Night",
      club: "Music",
      description: "A night of music performances by various artists.",
    },
    {
      title: "Guitar Workshop",
      club: "Music",
      description: "A workshop for guitar players to improve their skills.",
    },
    {
      title: "Jazz Band Competition",
      club: "Music",
      description: "A competition for jazz bands to perform.",
    },
    {
      title: "Classical Music Concert",
      club: "Music",
      description: "A concert showcasing classical music performances.",
    },
    {
      title: "Songwriting Challenge",
      club: "Music",
      description: "A challenge to write and perform an original song.",
    },
  ],
  Dance: [
    {
      title: "Hip Hop Dance Battle",
      club: "Dance",
      description: "A dance competition showcasing different hip hop styles.",
    },
    {
      title: "Contemporary Dance Showcase",
      club: "Dance",
      description: "A showcase of different contemporary dance styles.",
    },
    {
      title: "Ballet Performance",
      club: "Dance",
      description: "A ballet performance showcasing different ballet styles.",
    },
    {
      title: "Salsa Dance Workshop",
      club: "Dance",
      description: "A workshop for salsa dance techniques.",
    },
    {
      title: "Street Dance Performance",
      club: "Dance",
      description:
        "A street dance performance showcasing different street dance styles.",
    },
  ],
  Technical: [
    {
      title: "Coding Challenge",
      club: "Technical",
      description: "A programming challenge for coders.",
    },
    {
      title: "Hackathon",
      club: "Technical",
      description:
        "A programming competition where teams build software solutions.",
    },
    {
      title: "Web Development Workshop",
      club: "Technical",
      description: "A workshop for web development techniques.",
    },
  ],
};

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("Drama");

  return (
    <div className="h-fit bg-events md:bg-contain bg-cover md:bg-left bg-right bg-no-repeat bg-fixed">
      <h1 className="text-3xl font-bold text-center pt-5">Events</h1>
      {/* Tabs for each club in events */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-3 md:gap-x-3 gap-x-1 lg:w-3/4 w-11/12 mx-auto my-8">
        {Object.keys(events).map((club) => (
          <p
            className=" bg-quaternary text-center text-lg rounded-full py-2 text-white font-semibold cursor-pointer"
            onClick={(e) => {
              console.log(club);
              setActiveTab(club);
            }}
          >
            {club}
          </p>
        ))}
      </div>
      {/* Club Tabs */}
      {Object.keys(events).map((club) => {
        return (
          activeTab === club && (
            <div className="grid grid-cols-1 justify-items-center">
              {events[club].map((event) => {
                console.log(event);
                return (
                  <EventCard
                    title={event.title}
                    club={event.club}
                    description={event.description}
                  />
                );
              })}
            </div>
          )
        );
      })}

      {/* <div className="grid grid-cols-1 justify-items-center">
        <EventCard />
        <EventCard />
        <EventCard />
      </div> */}
    </div>
  );
};
export default EventsPage;
