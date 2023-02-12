import "./App.css";
import { NavBar } from "./Components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventsPage from "./Pages/EventsPage";
import NotFoundPage from "./Pages/notFoundPage";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import UserPage from "./Pages/UserPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <section className="mb-10 mt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
