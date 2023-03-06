import { useUser } from "../../Contexts/userContext";
import { useEffect, useState } from "react";
// import Razorpay from "razorpay";
import api from "../../Utils/axios.config";
import logo from "../../Assets/logo.png";

const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("Solo");
  const [isNull, setNull] = useState(true);
  const event_participated = JSON.stringify({
    event_id: props.id,
    event_title: props.title,
  });
  console.log(event_participated);
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  const { paid, setPaid } = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(user);
    if (user !== null) {
      setNull(false);
      team[0] = user.aura_id;
    } else {
      setNull(true);
    }
  }, [setNull, team, user]);

  const handleName = (e) => {
    setName(e);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handleInputChange = (index, event) => {
    const newInputs = [...team];
    newInputs[index] = event.target.value;
    setTeam(newInputs);
    // console.log(team);
  };

  const createOrder = async () => {
    try {
      const { data } = await api.get(`/payments/order?event_id=${props.id}`);
      return data.data.order;
    } catch (error) {
      console.log("Error creating order:", error);
      return null;
    }
  };

  const handlePaymentSuccess = async (orderId, paymentData) => {
    try {
      const data = {
        orderCreationId: orderId,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpaySignature: paymentData.razorpay_signature,
      };
      await api.post(`/payments/order/${orderId}/receipt`, data);
      setPaid(true);
    } catch (error) {
      console.log("Error processing payment:", error);
      setPaid(false);
    }
  };

  const paymentModal = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const order = await createOrder();
    // console.log(process.env.REACT_APP_RZRKEY);
    if (!order) {
      setLoading(false);
      alert("Unable to create payment order. Please try again later.");
      return;
    }
    const amount = order.amount;
    const orderId = order.id;
    const currency = order.currency;
    const key = process.env.REACT_APP_RZRKEY;

    const options = {
      key: key,
      amount: amount.toString(),
      currency: currency,
      name: "KLS GIT, Belagavi",
      description: "Test Transaction",
      image: logo,
      order_id: orderId,
      handler: (response) => handlePaymentSuccess(orderId, response),
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "KLSGIT of Belagavi",
      },
      theme: {
        color: "#ffffff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // handleSubmit();
    setLoading(false);
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    let ele = document.getElementById("msg");

    if (isNull === true && paid === true) {
      ele.innerHTML = "You need to have an account to register for an event!";
    } else {
      ele.innerHTML = "Registrations will start on March 5th! :)";
      const team_name = JSON.stringify({ name });
      const team_members = JSON.stringify({ team });
      await api.post("/teams/createteam", {
        event_participated,
        team_name,
        team_members,
      });
    }
  };
  // eslint-disable-next-line no-unused-vars
  //   const { setUser } = useUser();
  const n = props.size;
  // console.log(n);
  // const times = [...Array(n).keys()];
  const renderInputForms = (x) => {
    const inputForms = [];

    for (let i = 1; i < x; i++) {
      inputForms.push(
        <>
          <label className="py-3 col-span-1" htmlFor={`tm${i}`} key={i + 20}>
            Team Mate {i}
          </label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            key={i}
            value={team[i] || ""}
            onChange={(e) => handleInputChange(i, e)}
            disabled={false}
            required
            placeholder="Enter Teammate's Aura ID"
          />
        </>
      );
    }

    return inputForms;
  };

  return (
    <div className="align-middle rounded-lg grid justify-items-stretch p-5 lg:w-4/6 md:w-5/6 w-11/12 shadow-xl bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100">
      {n > 1 && (
        <>
          <h1 className="font-bold text-xl text-center m-2">
            Register your team
          </h1>
          <label className="py-3 col-span-1">Team Name</label>
          <input
            className="bg-gray-100 rounded-lg p-2 col-span-1 outline-none"
            onChange={(e) => handleName(e)}
            disabled={false}
            required
            placeholder="Enter Team Name"
          />
        </>
      )}
      {n === 1 && (
        <h1 className="font-bold text-xl text-center m-2">Register yourself</h1>
      )}
      <div>
        <form>
          <div className="grid grid-cols-1 my-1">{renderInputForms(n)}</div>
          {n > 0 && (
            <div className="grid justify-center my-8">
              <p id="msg" className="my-2"></p>
              <button
                className="btn btn-primary row-start-2 justify-self-center"
                onClick={paymentModal}
                disabled={loading}
              >
                Register
              </button>
            </div>
          )}
          {/* {console.log(team, Mem)} */}
        </form>
      </div>
    </div>
  );
};
export default TeamRegister;
