import { useState } from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../Components/EventDetails/EventDetails";
import EventCoordinators from "../Components/EventCoords/EventCoords";

const EventsDetailsPage = () => {
  const eventId = useParams().id;
  const [event, setEvent] = useState({
    title: "The Event Title",
    club: "Club Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    team_size: 4,
    rounds: 3,
    registration_limit: "50",
    rules: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Ut eu diam quis purus dignissim malesuada.",
      "Pellentesque eu sem varius, tincidunt diam vitae, semper eros.",
      "Praesent et elit at sapien euismod pretium.",
    ],
    event_coordinators: [
      {
        name: "John Doe",
        contact_number: "1234567890",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Patrik Bateman",
        contact_number: "6969696969",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        name: "Ananya Grande",
        contact_number: "4545454545",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
      },
    ],
  });

  return (
    <div className="flex flex-col items-center w-[90%] mx-auto">
      <div className="w-full">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt={`${event.title}-banner`}
        />
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-lg text-justify my-5">{event.description}</p>
        <EventDetails event={event} />
        <div className="flex justify-center my-8">
          <button className="btn btn-primary md:w-[20vw] w-[80vw]">
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
