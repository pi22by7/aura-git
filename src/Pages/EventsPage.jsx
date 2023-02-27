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
        console.log(response.data.data);
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
      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-3 md:gap-x-3 gap-x-1 lg:w-3/4 w-11/12 mx-auto my-8">
        {events.map((club) => (
          <p
            className=" bg-quaternary text-center text-lg rounded-full py-2 text-white font-semibold cursor-pointer"
            onClick={(e) => {
              console.log(club);
              setActiveTab(club._id);
            }}
          >
            {club._id}
          </p>
        ))}
      </div>
      {/* Club Tabs */}
      {events.map((club) => {
        return (
          activeTab === club._id && (
            <div className="grid grid-cols-1 justify-items-center ">
              {club.events.map((event) => {
                console.log(event);
                return (
                  <EventCard
                    id={event._id}
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
