import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import axios from "axios";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);

  async function createOrder() {
    try {
      const { data } = await axios.post("http://localhost:3001/payment/orders");
      return data;
    } catch (error) {
      console.log("Error creating order:", error);
      return null;
    }
  }

  async function handlePaymentSuccess(orderId, paymentData) {
    try {
      const data = {
        orderCreationId: orderId,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpaySignature: paymentData.razorpay_signature,
      };
      const response = await axios.post(
        "http://localhost:3001/payment/success",
        data
      );
      alert(response.data.msg);
    } catch (error) {
      console.log("Error processing payment:", error);
    }
  }

  async function displayModal() {
    setLoading(true);
    const order = await createOrder();
    if (!order) {
      setLoading(false);
      alert("Unable to create payment order. Please try again later.");
      return;
    }
    const { amount, id: orderId, currency } = order;

    const options = {
      key: "rzp_test_vHqEp7rceoarGn", // Enter the Key ID generated from the Dashboard
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
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Register Now</p>
        <button className="btn" onClick={displayModal} disabled={loading}>
          {loading ? "Loading..." : "Pay ₹50"}
        </button>
      </header>
    </div>
  );
};

export default PaymentForm;
