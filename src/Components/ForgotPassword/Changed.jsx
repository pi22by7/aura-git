import axios from "axios";
import { useEffect } from "react";

const Changed = () => {
  let slugFind = (url) => new URL(url).pathname.match(/[^/]+/g);
  let slug = String(slugFind(window.location.href));
  let params = String(window.location.search);
  console.log("test", slug, params);

  useEffect(() => {
    async function onSuccess() {
      try {
        if (slug === "verifyPass") {
          const response = await axios.get(
            `http://localhost:3001/tickets/verification/password/resolve${params}`
          );
          console.log(response.data.msg);
          console.log(params);
        } else if (slug === "verifyEmail") {
          const response = await axios.get(
            `http://localhost:3001/tickets/verification/email/resolve${params}`
          );
          console.log(response.data.msg);
        }
      } catch (error) {
        console.log("Error Verifying Change.", error);
      }
    }
    onSuccess();
  });

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
