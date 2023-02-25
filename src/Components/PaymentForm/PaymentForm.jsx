// // import React, { useState } from "react";
// // import Razorpay from "razorpay";
// import logo from "../../Assets/logo.png";
// import axios from "axios";
// import { useEffect } from "react";

// const PaymentForm = () => {
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   useEffect(() => {
//     loadScript("https://checkout.razorpay.com/v1/checkout.js");
//   });
//   return <section className="card-list"></section>;
// };

// export default PaymentForm;
