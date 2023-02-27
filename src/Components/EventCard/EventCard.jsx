import { Link } from "react-router-dom";

export const EventCard = ({ id, title, club, description, slugs }) => {
  return (
    <div
      key={id}
      className="event grid md:grid-cols-2 rounded-lg m-5 lg:w-3/4 w-11/12 h-fit bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20"
    >
      <div className="">
        <img
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt="EventArt"
          className="self-center h-full object-contain lg:pl-5 pl-0"
        />
      </div>
      <div className="event-info grid grid-cols-1 p-5 w-full md:text-left justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xl font-semibold">{club}</h3>
        <h3 className="text-xl mt-5 font-semibold">Description:</h3>
        <p className="text-justify font-semibold">{description}</p>
        {console.log(slugs)}
        <Link
          to={`/events/${slugs.club}/${slugs.title}`}
          className="mt-5 place-self-end"
        >
          <button className="btn btn-primary">View Details</button>
        </Link>
      </div>
    </div>
  );
};
