import axios from "axios";
const Changed = () => {
  success();
  async function success() {
    try {
      let slug = (url) => new URL(url).pathname.match(/[^\/]+/g);
      if (slug === "verifyPass") {
        const params = new URLSearchParams(window.location.search);
        const response = await axios.get(
          "http://localhost:3001/tickets/verification/password/resolve",
          {
            params,
          }
        );
        console.log(response.data.msg);
      } else if (slug === "verifyEmail") {
        const params = new URLSearchParams(window.location.search);
        const response = await axios.get(
          "http://localhost:3001/tickets/verification/email/resolve",
          {
            params,
          }
        );
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log("Error Resetting Password.", error);
    }
  }

  return (
    <div className="grid justify-items-center v-screen w-screen">
      <div className="rounded-lg grid justify-items-stretch p-5 lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Reset Password</h1>
        <p className="font-semibold text-md text-center m-2">
          Your password has been changed!
        </p>
      </div>
    </div>
  );
};
export default Changed;
