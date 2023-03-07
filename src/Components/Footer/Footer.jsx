import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  // faTwitter,
  // faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../Assets/logo.png";

export const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-100 pt-5">
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div>
            <img src={logo} alt="logo" className="w-36" />
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Resources
            </div>
            <a className="my-3 block" href="/">
              Home
            </a>
            <a className="my-3 block" href="/#/competitions">
              Competitions
            </a>
            <a className="my-3 block" href="/#/rule-book">
              Rule Book
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Support
            </div>
            <a className="my-3 block" href="/#/contact-us">
              Contact Us
            </a>
            <a className="my-3 block" href="/#/dev-team">
              Dev Team
            </a>
            <a className="my-3 block" href="/#/terms-and-conditions">
              Terms and Conditions
            </a>
            <a className="my-3 block" href="/#/privacy-policy">
              Privacy Policy
            </a>
            <a className="my-3 block" href="/#/refund-policy">
              Refund Policy
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Contact us
            </div>
            <a
              className="my-3 block"
              href="https://goo.gl/maps/q4XM2aKJqnPW7soQ9"
              target="_blank"
              rel="noreferrer"
            >
              Udyambag Industrial Area, Udyambag, Belagavi, Karnataka 590006
            </a>
            <a className="my-3 block" href="mailto:aura23.klsgit@gmail.com">
              aura23.klsgit@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row mt-2 flex-row flex">
            <a
              href="https://www.instagram.com/aura_git/"
              target="_blank"
              rel="noreferrer"
              className="w-6 mx-1"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a
              href="https://www.facebook.com/klsgitaura/"
              target="_blank"
              rel="noreferrer"
              className="w-6 mx-1"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
            {/* <a href="/#" target="_blank" className="w-6 mx-1">
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a> */}
            {/* <a href="/#" target="_blank" className="w-6 mx-1">
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a> */}
          </div>
          <div className="my-5">© Copyright 2023. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};
