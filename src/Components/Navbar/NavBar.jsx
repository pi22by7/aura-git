import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../Contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import logo from "../../Assets/logo.png";
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
    <nav className="md:grid md:grid-cols-3 md:place-items-center flex justify-between items-center sticky top-0 w-full md:px-12 px-6 py-4 bg-slate-400 bg-clip-padding backdrop-filter backdrop-blur-lg border overflow-hidden bg-opacity-20 border-black-100 z-40">
      <div className="md:place-self-start">
        <Link className="font-bold text-xl" to="/">
          <img src={logo} className="h-16 mr-3 sm:h-9" alt="Aura Logo" />
        </Link>
      </div>
      <div
        ref={navMenuRef}
        className="nav-menu md:place-self-center md:static absolute min-h-fit bg-none md:w-auto w-full left-0 top-[100%] md:py-0 py-5 md:contents hidden transition duration-300 ease-in"
      >
        <ul className="flex md:flex-row flex-col md:items-center gap-3">
          <li className="lg:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/">
              Home
            </NavLink>
          </li>
          <li className="lg:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/events">
              Events
            </NavLink>
          </li>
          <li className="lg:px-5 px-3">
            <NavLink onClick={handleMenuToggle} to="/rule-book">
              Rule Book
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="md:place-self-end">
        {!user && (
          <>
            <NavLink onClick={handleMenuHide} to="/login">
              <button className="nav-btn bg-quaternary mx-2">Login</button>
            </NavLink>
            <NavLink onClick={handleMenuHide} to="/signup">
              <button className="nav-btn bg-quaternary mx-2">Signup</button>
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink onClick={handleMenuHide} to="/profile">
              <button className="nav-btn bg-quaternary mx-2">Profile</button>
            </NavLink>
            <button
              className="nav-btn bg-quaternary mx-2"
              onClick={() => setUser(null)}
            >
              Logout
            </button>
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
