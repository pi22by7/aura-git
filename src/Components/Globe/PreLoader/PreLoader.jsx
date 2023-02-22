import logo from "../../../Assets/logo.png";
const PreLoader = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white absolute top-0">
      <img src={logo} className="h-32 mr-3 sm:h-16" alt="Aura Logo" />
      <p className="text-2xl text-black text-center">Loading...</p>
    </div>
  );
};

export default PreLoader;
