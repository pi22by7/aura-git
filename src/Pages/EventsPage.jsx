import { EventPlaceholder } from "../Components/EventPlaceholder/EventPlaceholder";

const EventsPage = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <h1 className="text-3xl font-bold text-center">Events Page</h1>
      <br />
      <EventPlaceholder />
    </div>
  );
};
export default EventsPage;
