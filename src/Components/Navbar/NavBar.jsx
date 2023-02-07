import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="flex justify-between p-5 bg-secondary text-white">
      <a className="font-bold text-xl">
        <Link to="/">Aura</Link>
      </a>
      <ul className="flex">
        <li className="px-5">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="px-5">
          <NavLink to="/events">Events</NavLink>
        </li>
        <li className="px-5">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="px-5">
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    </nav>
  );
};
