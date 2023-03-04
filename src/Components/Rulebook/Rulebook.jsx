const Rulebook = () => {
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-5 grid-cols-1 h-[100vh] bg-rulebookc w-screen user-none bg-rulebook md:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-scroll overflow-scroll [&::-webkit-scrollbar]:hidden md:px-10 px-6 py-5">
      <div className="w-full h-full lg:col-start-6 md:col-start-2 lg:col-span-7 md:col-span-3 col-span-1  mx-auto">
        <iframe
          src="https://drive.google.com/file/d/1cOfZzNLn9hb3m5gCvrkp-nH2ne7G0t3f/preview"
          width="100%"
          height="100%"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};

export default Rulebook;
