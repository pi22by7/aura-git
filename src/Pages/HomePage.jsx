import { useEffect } from "react";
import GlobeComponent from "../Components/Globe/Globe";
import { messageToast } from "../Utils/Toasts/Toasts";

const HomePage = () => (
  // useEffect(() => {
  //   messageToast(
  //     "Online Registration will close on 14 March 5:00 PM",
  //     "bottom-left",
  //     5000
  //   );
  //   messageToast(
  //     "No registrations will be accepted if the payment is not completed",
  //     "bottom-left",
  //     5000
  //   );
  // }, []),
  <div>
    {/* <Map /> */}
    {/* <h1 className="text-3xl font-bold text-center">Home</h1> */}
    <GlobeComponent />
  </div>
);
export default HomePage;
