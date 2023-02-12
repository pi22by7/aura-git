export const EventPlaceholder = () => {
  return (
    <div className="event grid grid-cols-2 rounded-lg border border-primary m-5 p-10 w-1/2 justify-self-center">
      <div className="event-plac w-1/3"></div>
      <div className="event-info w-2/3">
        <h1 className="text-3xl">Title</h1>
        <h3 className="text-xl">Tagline</h3>
        <h3 className="text-xl mt-5">Rules:</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          aperiam voluptatem nesciunt accusamus amet, veniam sunt rem soluta
          possimus corporis tenetur temporibus velit, autem eaque architecto
          nobis tempora officiis molestiae.
        </p>
      </div>
    </div>
  );
};
