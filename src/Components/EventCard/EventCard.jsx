export const EventCard = ({ title, club, description }) => {
  return (
    <div className="event grid md:grid-cols-2 rounded-lg m-5 lg:w-3/4 w-11/12 h-fit bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20">
      <div className="">
        <img
          src="https://cdn.pastemagazine.com/www/articles/best-of-festival-posters.jpg"
          alt="EventArt"
          className="self-center h-full object-contain"
        />
      </div>
      <div className="event-info p-5 w-full md:text-left justify-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xl font-semibold">{club}</h3>
        <h3 className="text-xl mt-5 font-semibold">Description:</h3>
        <p className="text-justify font-semibold">{description}</p>
      </div>
    </div>
  );
};