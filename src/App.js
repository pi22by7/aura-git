import "./App.css";
import { useState, useEffect } from "react";
import api from "./Utils/axios.config";
import { useUser } from "./Contexts/userContext";
import { NavBar } from "./Components/Navbar/NavBar";
import { Footer } from "./Components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import { AuthAvailabel, AuthRequired } from "./Utils/AuthCheck/AuthCheck";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import EventsDetailsPage from "./Pages/EventDetailsPage";
import NotFoundPage from "./Pages/notFoundPage";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Contact from "./Components/Contact/Contact";
import UserPage from "./Pages/UserPage";
// import PasswordEnter from "./Components/ForgotPassword/PasswordEnter";
import DevTeam from "./Components/DevTeam/DevTeam";
import Changed from "./Components/ForgotPassword/Changed";
// import PaymentForm from "./Components/PaymentForm/PaymentForm";

function App() {
  const { setUser } = useUser();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("uid")) return setLoading(false);
      await api
        .get(
          `${
            process.env.REACT_APP_BACKEND_HOST
          }/auth/user/${localStorage.getItem("uid")}`
        )
        .then((res) => {
          setUser(res.data.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  });
  return (
    <div className="App">
      <NavBar />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:club/:title" element={<EventsDetailsPage />} />
          <Route
            path="login"
            element={
              <AuthAvailabel>
                <Login />
              </AuthAvailabel>
            }
          />
          <Route
            path="signup"
            element={
              <AuthAvailabel>
                <SignUp />
              </AuthAvailabel>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="contact-us" element={<Contact />} />
          <Route
            path="profile"
            element={
              <AuthRequired>
                <UserPage />
              </AuthRequired>
            }
          />
          <Route path="dev-team" element={<DevTeam />} />
          <Route path="verifyPass" element={<Changed />} />
          <Route path="verifyEmail" element={<Changed />} />
          {/* <Route path="payment" element={<PaymentForm />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default App;
