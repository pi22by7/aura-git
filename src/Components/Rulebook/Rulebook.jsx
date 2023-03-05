const Rulebook = () => {
  return (
    <div className="grid lg:grid-cols-12 md:grid-cols-5 grid-cols-1 h-[100vh] bg-rulebookc w-screen user-none bg-rulebook md:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-scroll overflow-scroll [&::-webkit-scrollbar]:hidden md:px-10 px-6 py-5">
      <div className="w-full h-full relative lg:col-start-6 md:col-start-2 lg:col-span-7 md:col-span-3 col-span-1  mx-auto">
        <iframe
          src="https://drive.google.com/file/d/1rY2VcAmbpvWIKen1cwBCAMcg4rbaCuhg/preview"
          width="100%"
          height="100%"
          allow="autoplay"
          title="Rulebook"
        ></iframe>
        <a
          href="https://drive.google.com/file/d/10hPUDlX0J1Ubncq-WPFWqLPhK-galBg8/view?usp=sharing"
          target="_blank"
          className="lg:w-fit w-full absolute lg:right-10 right-1/2 lg:bottom-3 bottom-16 transform translate-x-1/2 lg:translate-x-0 px-2"
        >
          <button className="btn btn-primary w-full text-white font-bold py-2 px-4 rounded-full">
            Download Rulebook
          </button>
        </a>
      </div>
    </div>
  );
};

export default Rulebook;
