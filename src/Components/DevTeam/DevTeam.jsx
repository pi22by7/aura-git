import Venki from "../../Assets/Team/Venki.jpg";
import π from "../../Assets/Team/π.jpg";
import SBT from "../../Assets/Team/SBT.jpg";
import Parishkar from "../../Assets/Team/Parishkar.jpg";
import Kishor_Balgi from "../../Assets/Team/Kishor_Balgi.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const team = [
  {
    name: "Venkatesh Dhongadi",
    role: "Co-Ordinator",
    image: Venki,
    linkedin: "https://in.linkedin.com/in/venkatesh-dhongadi-ba2904187",
    instagram: "https://www.instagram.com/flick_23/",
    github: "https://github.com/flick-23",
  },
  {
    name: "Piyush Airani",
    role: "Co-Ordinator",
    image: π,
    linkedin: "https://in.linkedin.com/in/piyush-airani",
    instagram: "https://www.instagram.com/pi_22by7/",
    github: "https://github.com/pi22by7",
  },
  {
    name: "Kishor Balgi",
    role: "Frontend Developer",
    image: Kishor_Balgi,
    linkedin: "https://www.linkedin.com/in/kishorbalgi",
    instagram: "https://www.instagram.com/kishor_balgi/",
    github: "https://github.com/KishorBalgi",
  },
  {
    name: "Saumitra Topinkatti",
    role: "Backend Developer",
    image: SBT,
    linkedin:
      "https://in.linkedin.com/in/saumitra-topinkatti-45a577208?trk=public_profile_browsemap",
    instagram: "https://www.instagram.com/professor_oof/",
    github: "https://github.com/SBTopZZZ-LG",
  },
  {
    name: "Parishkar Singh",
    role: "Backend Developer",
    image: Parishkar,
    linkedin: "https://www.linkedin.com/in/parishkar-singh-831a211b5/",
    instagram: "https://www.instagram.com/parishkar_singh_/",
    github: "https://github.com/parishkar-9790",
  },
];

const DevTeam = () => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-center">Dev Team</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 my-5">
        {team.map((member) => (
          <div className="flex flex-col items-center py-3">
            <img
              src={member.image}
              alt="avatar"
              className="rounded-full h-52 w-52 object-cover"
            />
            <h3 className="text-xl font-bold my-2">{member.name}</h3>
            <p className="text-lg font-semibold">{member.role}</p>
            <div className="flex mt-5">
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-2xl text-blue-600 mx-2"
                />
              </a>
              <a href={member.instagram} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-2xl text-red-600 mx-2"
                />
              </a>
              <a href={member.github} target="_blank" rel="noreferrer">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-2xl text-black-600 mx-2"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevTeam;
