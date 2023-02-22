import { EventCard } from "../Components/EventCard/EventCard";

const EventsPage = () => {
  return (
    <div className="h-[100vh] mt-16 bg-events bg-contain bg-no-repeat overflow-scroll [&::-webkit-scrollbar]:hidden">
      <h1 className="text-3xl font-bold text-center">Events</h1>
      <div className="grid grid-cols-1 justify-items-center">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};
export default EventsPage;
