// import logo from "../../../Assets/logo.png";
import welcome from "../../../Assets/welcome.png";
const PreLoader = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white absolute top-0 z-50">
      <img src={welcome} className="mr-3 md:h-64 h-40" alt="Aura Logo" />
      {/* <p className="text-2xl text-black text-center">Loading...</p> */}
    </div>
  );
};

export default PreLoader;
