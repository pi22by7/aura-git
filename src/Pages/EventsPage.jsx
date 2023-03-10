import { useState } from "react";
import { useEffect } from "react";
import api from "../Utils/axios.config";
import { messageToast } from "../Utils/Toasts/Toasts";
import { EventCard } from "../Components/EventCard/EventCard";
import PreLoader from "../Components/PreLoader/PreLoader";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    messageToast("You can check the latest updates on our News section.");
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
    <div className="h-screen grid md:grid-cols-3 grid-cols-1 bg-events md:bg-contain bg-cover md:bg-left bg-right bg-no-repeat bg-scroll bg-eventc overflow-scroll [&::-webkit-scrollbar]:hidden">
      <div className="lg:col-start-2 lg:col-span-2 md:col-span-3 col-span-1">
        <h1 className="text-3xl font-bold text-center pt-5">Competitions</h1>
        {/* Tabs for each club in events */}
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 md:gap-x-3 gap-x-1 lg:w-3/4 w-11/12 mx-auto my-8">
          {events.map((club) => (
            <p
              key={club._id}
              className={`text-center text-lg rounded-full py-2 text-white font-semibold cursor-pointer ${
                club._id === activeTab ? "bg-tertiary" : "bg-quaternary"
              }`}
              onClick={(e) => {
                setActiveTab(club._id);
              }}
            >
              {club._id.replace("Club", "")}
              {/* {club._id} */}
            </p>
          ))}
        </div>
        {/* Club Tabs */}
        {events.map((club) => {
          return (
            activeTab === club._id && (
              <div
                key={club._id}
                className="grid grid-cols-1 justify-items-center"
              >
                {club.events.map((event) => {
                  return <EventCard key={event._id} event={event} />;
                })}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
export default EventsPage;
