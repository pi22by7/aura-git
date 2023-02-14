import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-100 pt-5">
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-xl text-indigo-600">Aura</h3>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Resources
            </div>
            <a className="my-3 block" href="/">
              Home
            </a>
            <a className="my-3 block" href="/events">
              Events
            </a>
            <a className="my-3 block" href="/rule-book">
              Rule Book
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Support
            </div>
            <a className="my-3 block" href="/contact-us">
              Contact Us
            </a>
            <a className="my-3 block" href="/#">
              Privacy Policy
            </a>
            <a className="my-3 block" href="/#">
              Conditions
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Contact us
            </div>
            <a className="my-3 block" href="/#">
              Udyambag Industrial Area, Udyambag, Belagavi, Karnataka 590006
            </a>
            <a className="my-3 block" href="mailto: aura@git.edu">
              aura@git.edu
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href="/#" className="w-6 mx-1">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>
            <a href="/#" className="w-6 mx-1">
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
            <a href="/#" className="w-6 mx-1">
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
          </div>
          <div className="my-5">© Copyright 2020. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};
