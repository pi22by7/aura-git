import Venki from "../../Assets/Team/Venki.jpg";
import π from "../../Assets/Team/π.jpg";
import Vinayak from "../../Assets/Team/Vinayak.jpg";
import Raj from "../../Assets/Team/Raj.heic";
import Vaishnavi from "../../Assets/Team/VK.jpg";
import Sanjitha from "../../Assets/Team/S3.jpg";
import Tejaswith from "../../Assets/Team/VK.jpg";
import Jeetendra from "../../Assets/Team/VK.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const council = [
  {
    name: "Vaishnavi Kulkarni",
    role: "General Secretary",
    image: Vaishnavi,
    instagram: "https://www.instagram.com/vaishnavi_k2310/",
    phone: 9243221195,
    handle: "vaishnavi_k2310",
  },
  {
    name: "Vinayak Biswagar",
    role: "General Secretary",
    image: Vinayak,
    instagram: "https://www.instagram.com/null/",
    phone: 7022683215,
    handle: "null",
  },
  {
    name: "Sanjitha Bhat",
    role: "General Secretary",
    image: Sanjitha,
    instagram: "https://www.instagram.com/Sanjitha_bhat/",
    phone: 8431642248,
    handle: "Sanjitha_bhat",
  },
  {
    name: "Raj Bichu",
    role: "General Secretary",
    image: Raj,
    instagram: "https://www.instagram.com/rawwwj/",
    phone: 7899570999,
    handle: "rawwwj",
  },
  {
    name: "Venkatesh Dhongadi",
    role: "Co-Ordinator",
    image: Venki,
    instagram: "https://www.instagram.com/flick_23/",
    phone: 0,
    handle: "flick_23",
  },
  {
    name: "Piyush Airani",
    role: "Co-Ordinator",
    image: π,
    instagram: "https://www.instagram.com/pi_22by7/",
    phone: 9545100233,
    handle: "pi22by7",
  },
  {
    name: "Jeetendra Kumar Garag",
    role: "Co-Ordinator",
    image: Jeetendra,
    instagram: "https://www.instagram.com/jeetendrakumargarag/",
    phone: 0,
    handle: "jeetendrakumargarag",
  },
  {
    name: "Tejaswith Shigihalli",
    role: "Co-Ordinator",
    image: Tejaswith,
    instagram: "https://www.instagram.com/tejaswith_/",
    phone: 0,
    handle: "tejaswith",
  },
];

const Contact = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center">Dev Team</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 my-5">
        {council.map((member) => (
          <div className="flex flex-col items-center py-3" key={member.name}>
            <img
              src={member.image}
              alt="avatar"
              className="rounded-full h-52 w-52 object-cover"
            />
            <h3 className="text-xl font-bold my-2">{member.name}</h3>
            <p className="text-lg font-semibold">{member.role}</p>
            <div className="grid mt-5">
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="justify-self-center"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-2xl text-red-600 justify-self-center"
                />
                <text> {member.handle}</text>
              </a>
              <p className="justify-self-center">{member.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
