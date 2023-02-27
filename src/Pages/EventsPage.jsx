import { useState } from "react";
import { useEffect } from "react";
import api from "../Utils/axios.config";
import { EventCard } from "../Components/EventCard/EventCard";
import PreLoader from "../Components/PreLoader/PreLoader";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/events");
        response.data.data.events.sort((a, b) => {
          return a._id > b._id ? 1 : -1;
        });
        setEvents(response.data.data.events);
        setActiveTab(response.data.data.events[0]._id);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="h-fit bg-events md:bg-contain bg-cover md:bg-left bg-right bg-no-repeat bg-fixed bg-eventc">
      <h1 className="text-3xl font-bold text-center pt-5">Events</h1>
      {/* Tabs for each club in events */}
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 md:gap-x-3 gap-x-1 lg:w-3/4 w-11/12 mx-auto my-8">
        {events.map((club) => (
          <p
            key={club._id}
            className=" bg-quaternary text-center text-lg rounded-full py-2 text-white font-semibold cursor-pointer"
            onClick={(e) => {
              setActiveTab(club._id);
            }}
          >
            {club._id}
          </p>
        ))}
      </div>
      {/* Club Tabs */}
      {events.map((club) => {
        console.log(club);
        return (
          activeTab === club._id && (
            <div
              key={club._id}
              className="grid grid-cols-1 justify-items-center "
            >
              {club.events.map((event) => {
                return (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    club={event.club}
                    slugs={event._slugs}
                    description={event.description}
                  />
                );
              })}
            </div>
          )
        );
      })}
    </div>
  );
};
export default EventsPage;
