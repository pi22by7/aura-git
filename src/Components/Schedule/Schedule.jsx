const Schedule = () => {
  const id = "1rY2VcAmbpvWIKen1cwBCAMcg4rbaCuhg";
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-5 grid-cols-1 h-[100vh] bg-schedulec w-screen user-none bg-schedule md:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-scroll overflow-scroll [&::-webkit-scrollbar]:hidden md:px-10 px-6 py-5">
      <div className="w-full h-full relative lg:col-start-6 md:col-start-2 lg:col-span-7 md:col-span-3 col-span-1  mx-auto">
        {/* <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          width="100%"
          height="100%"
          allow="autoplay"
          title="Rulebook"
        ></iframe>
        <a
          href={`https://drive.google.com/uc?export=download&id=${id}`}
          rel="noreferrer"
          className="lg:w-fit w-full absolute lg:right-10 right-1/2 lg:bottom-3 bottom-16 transform translate-x-1/2 lg:translate-x-0 px-2"
        >
          <button className="btn btn-primary w-full text-white font-bold py-2 px-4 rounded-full">
            Download Schedule
          </button>
        </a> */}
        <h1 className="text-3xl font-bold text-center">
          Schedule will be updated soon
        </h1>
        <h1 className="text-xl font-semibold text-center mt-12">
          Please check updates on our{" "}
          <a href="/#/news" className="text-blue-500">
            News
          </a>{" "}
          page
        </h1>
      </div>
    </div>
  );
};

export default Schedule;
