import { useUser } from "../../Contexts/userContext";
import { useEffect, useState } from "react";
import api from "../../Utils/axios.config";
import logo from "../../Assets/logo.png";

const TeamRegister = (props) => {
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [isNull, setNull] = useState(true);
  const evPart = `{${props.id}, ${props.title}}`;
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  const { paid, setPaid } = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
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

  const handleInputChange = (index, event) => {
    const newInputs = [...team];
    newInputs[index] = event.target.value;
    setTeam(newInputs);
    // console.log(team);
  };

  const createOrder = async () => {
    try {
      const { data } = await api.post(`/payments/order`);
      return data;
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

  const paymentModal = async () => {
    setLoading(true);
    const order = await createOrder();
    if (!order) {
      setLoading(false);
      alert("Unable to create payment order. Please try again later.");
      return;
    }
    const { amount, id: orderId, currency } = order;

    const options = {
      key: process.env.RZRKEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "KLS GIT, Belagavi",
      description: "Test Transaction",
      image: logo,
      order_id: orderId,
      handler: (response) => handlePaymentSuccess(orderId, response),
      prefill: {
        name: "Piyush",
        email: "pi@example.com",
        contact: "6969696969",
      },
      notes: {
        address: "KLSGIT of Belagavi",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    paymentModal();
    let ele = document.getElementById("msg");

    if (isNull === true && paid === true) {
      ele.innerHTML = "You need to have an account to register for an event!";
    } else {
      ele.innerHTML = "Registrations will start on March 5th! :)";
      await api.post("/teams/createteam", {
        evPart,
        name,
        team,
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
                onClick={handleSubmit}
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
