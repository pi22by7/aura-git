import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/logo.png";
import api from "../../Utils/axios.config";
import "./NavBar.css";

export const NavBar = () => {
  const [menu, setToggleMenu] = useState(false);
  const { user, setUser } = useUser();
  const navMenuRef = useRef(null);

  // Handle menu toggle
  const handleMenuToggle = () => {
    if (menu) {
      navMenuRef.current.classList.add("hidden");
    } else {
      navMenuRef.current.classList.remove("hidden");
    }
    setToggleMenu((prev) => !prev);
  };

  // Hide menu on navigation
  const handleMenuHide = () => {
    if (menu) {
      navMenuRef.current.classList.add("hidden");
      setToggleMenu(false);
    }
  };

  return (
    <nav className="md:grid md:grid-cols-3 md:place-items-center flex justify-between items-center sticky top-0 w-full md:px-12 px-6 md:py-2 py-4 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border-1px bg-opacity-20 z-40 ">
      <div className="md:place-self-start">
        <Link className="font-bold text-xl" to="/">
          <img
            src={logo}
            className="md:h-20 mr-3 mb-0 h-12 overflow-clip"
            alt="Aura Logo"
            draggable={false}
          />
        </Link>
      </div>
      <div
        ref={navMenuRef}
        className="nav-menu md:place-self-center md:static absolute min-h-fit md:w-auto w-full left-0 top-[100%] md:py-0 py-5 md:contents hidden bg-white"
      >
        <ul className="flex md:flex-row flex-col md:items-center gap-3">
          <li className="md:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/">
              HOME
            </NavLink>
          </li>
          <li className="md:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/events">
              COMPETITIONS
            </NavLink>
          </li>
          <li className="md:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/rule-book">
              RULE BOOK
            </NavLink>
          </li>
          <li className="md:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/contact-us">
              CONTACT US
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="md:place-self-end md:my-auto">
        {!user && (
          <>
            <NavLink onClick={handleMenuHide} to="/signup">
              <button className="nav-btn bg-quaternary mx-1">REGISTER</button>
            </NavLink>
            {/* <NavLink onClick={handleMenuHide} to="/signup">
              <button className="nav-btn bg-quaternary mx-1">Signup</button>
            </NavLink> */}
          </>
        )}
        {user && (
          <>
            <NavLink onClick={handleMenuHide} to="/profile">
              <button className="nav-btn bg-quaternary mx-1">Profile</button>
            </NavLink>
            <Link
              onClick={async () => {
                setUser(null);
                localStorage.removeItem("uid");
                await api.get("/auth/user/logout");
              }}
              to="/"
            >
              <button className="nav-btn bg-quaternary mx-1">Logout</button>
            </Link>
          </>
        )}
        <FontAwesomeIcon
          icon={menu ? faClose : faBars}
          className="text-secondary text-lg cursor-pointer md:hidden px-1"
          onClick={handleMenuToggle}
        />
      </div>
    </nav>
  );
};
