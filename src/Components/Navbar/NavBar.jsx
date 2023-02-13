import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useUser } from "../../Contexts/userContect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
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
    <nav className="flex justify-between items-center bg-white text-black fixed top-0 w-full md:px-16 px-6 py-6">
      <div>
        <Link className="font-bold text-xl" to="/">
          Aura
        </Link>
      </div>
      <div
        ref={navMenuRef}
        className="nav-menu md:static absolute min-h-fit bg-primary md:w-auto w-full left-0 top-[100%] md:py-0 py-5 md:contents hidden transition duration-300 ease-in"
      >
        <ul className="flex md:flex-row flex-col md:items-center gap-[3vh]">
          <li className="px-5">
            <NavLink onClick={handleMenuToggle} to="/">
              Home
            </NavLink>
          </li>
          <li className="px-5">
            <NavLink onClick={handleMenuToggle} to="/events">
              Events
            </NavLink>
          </li>
          <li className="px-5">
            <NavLink onClick={handleMenuToggle} to="/rule-book">
              Rule Book
            </NavLink>
          </li>
          {/* <li className="px-5">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="px-5">
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li className="px-5">
            <NavLink to="/user">Profile</NavLink>
          </li> */}
        </ul>
      </div>
      <div>
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
            <NavLink onClick={handleMenuHide} to="/user">
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
          className="text-white text-lg cursor-pointer md:hidden px-1"
          onClick={handleMenuToggle}
        />
      </div>
    </nav>
  );
};
