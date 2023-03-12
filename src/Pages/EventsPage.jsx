import { useState } from "react";
import { useEffect } from "react";
import api from "../Utils/axios.config";
import { messageToast } from "../Utils/Toasts/Toasts";
import { EventCard } from "../Components/EventCard/EventCard";
import PreLoader from "../Components/PreLoader/PreLoader";
import chroma from "chroma-js";
import ColorThief from "colorthief";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [curBg, setCurBg] = useState("bg-dance");
  const [curBgC, setCurBgC] = useState("bg-dancec");
  const [curAcc, setAcc] = useState("bg-tertiary");
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

  const updateBg = (e) => {
    const bg = document.querySelector(".events-bg");
    bg.classList.remove(curBg);
    bg.classList.remove(curBgC);
    const cur =
      "bg-" +
      e.currentTarget.dataset.id
        .replaceAll("Club", "")
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .toLowerCase();
    setCurBg(cur);
    setCurBgC(cur + "c");
    bg.classList.add(cur);
    bg.classList.add(cur + "c");

    console.log(cur.toUpperCase());

    const colorThief = new ColorThief();
    const path =
      "../Assets/Events/" +
      e.currentTarget.dataset.id.replaceAll("Club", "").toUpperCase().trim() +
      ".png";
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const dominantColor = colorThief.getColor(img);
      const palette = chroma(dominantColor).palette();
      const mostProminentHue = palette.sort(
        (a, b) => chroma.contrast(a, "#ffffff") < chroma.contrast(b, "#ffffff")
      )[0];
      const darkestColor = chroma
        .scale(mostProminentHue)
        .mode("lab")
        .colors(10)[0];
      const tab = document.querySelector(".tabs");
      tab.classList.remove(curAcc);
      const curac = "bg-[" + darkestColor + "]";
      setAcc(curac);
      tab.classList.add(curac);
    };
  };

  if (events.length === 0) {
    return <PreLoader type="loading" />;
  }

  return (
    <div className="events-bg h-screen grid md:grid-cols-3 grid-cols-1 md:bg-contain bg-cover md:bg-left bg-right bg-no-repeat bg-scroll overflow-scroll [&::-webkit-scrollbar]:hidden bg-dance bg-dancec">
      <div className="lg:col-start-2 lg:col-span-2 md:col-span-3 col-span-1">
        <h1 className="text-3xl font-bold text-center pt-5">Competitions</h1>
        {/* Tabs for each club in events */}
        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-3 md:gap-x-3 gap-x-1 lg:w-3/4 w-11/12 mx-auto my-8">
          {events.map((club) => (
            <p
              key={club._id}
              data-id={club._id}
              className={`tabs text-center text-lg rounded-full py-2 text-white font-semibold cursor-pointer bg-tertiary`}
              // ${
              //   club._id === activeTab ? "bg-tertiary" : "bg-quaternary"
              // }`}
              onClick={(e) => {
                setActiveTab(club._id);
                updateBg(e);
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
