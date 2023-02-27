import logo from "../../Assets/logo.png";
import welcome from "../../Assets/welcome.png";
const PreLoader = ({ type }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white absolute top-0 z-50">
      {type == "welcome" && (
        <img src={welcome} className="mr-3 md:h-64 h-40" alt="Aura Logo" />
      )}
      {type == "loading" && (
        <img src={logo} className="mr-3 md:h-64 h-40" alt="Aura Logo" />
      )}
    </div>
  );
};

export default PreLoader;
