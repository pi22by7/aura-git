import api from "../../Utils/axios.config";

// import { useEffect } from "react";

const Changed = () => {
  let slugFind = (url) => new URL(url).pathname.match(/[^/]+/g);
  let slug = String(slugFind(window.location.href));
  let params = String(window.location.search);
  console.log("test", slug, params);

  async function onSuccess() {
    try {
      if (slug === "verifyPass") {
        const response = await api.get(
          `/tickets/verification/password/resolve${params}`
        );
        console.log(response.data.msg);
        console.log(params);
      } else if (slug === "verifyEmail") {
        const response = await api.get(
          `/tickets/verification/email/resolve?token=${params}`
        );
        console.log(response.data.msg);
      }
    } catch (error) {
      console.log("Error Verifying Change.", error);
    }
  }
  return (
    <div className="grid justify-items-center h-[90vh] place-items-center">
      <div className="rounded-lg grid justify-items-stretch p-5 h-fit lg:w-2/5 md:w-2/3 w-11/12 shadow-xl">
        <h1 className="font-bold text-xl text-center m-2">Reset Password</h1>
        <p className="font-semibold text-md text-center m-2">
          Click to verify password change.
        </p>
        <button className="btn bg-quaternary" onClick={onSuccess}>
          Click
        </button>
      </div>
    </div>
  );
};
export default Changed;
