import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker/Marker";
import Globe from "globe.gl";
import PreLoader from "./PreLoader/PreLoader";
import data from "./geo.json";
import art_map from "./update.png";
import logo from "../../Assets/logo.png";

const GlobeComponent = () => {
  const [loading, setLoading] = useState(true);
  const detRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const globeEl = document.getElementById("globeViz");
    globeEl.addEventListener("mouseenter", () => {
      setTimeout(100);
      world.controls().autoRotate = false;
    });
    globeEl.addEventListener("mouseleave", () => {
      world.controls().autoRotate = true;
      world.controls().update();
    });
    globeEl.addEventListener("touchstart", () => {
      console.log("touch");
      world.controls().autoRotate = false;
    });
    globeEl.addEventListener("touchend", () => {
      setTimeout(150000);
      // console.log("end");
      world.controls().autoRotate = true;
      world.controls().update();
    });
    const marker = `<svg viewBox="-4 0 36 36">
        <path
          fill="currentColor"
          d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"
        ></path>
        <circle fill="black" cx="14" cy="14" r="7"></circle>
      </svg>`;

    const gData = data.features.map((feature) => {
      const lat = feature.geometry.coordinates[1] - 7;
      const lng = feature.geometry.coordinates[0] - 6;
      const size = 30;
      const url = feature.properties.url;
      const color = ["red", "white", "blue", "green"][
        Math.round(Math.random() * 3)
      ];
      const title = feature.properties.title;

      return {
        lat,
        lng,
        size,
        url,
        color,
        title,
      };
    });

    const world = Globe({ animateIn: true, waitForGlobeReady: false })
      .globeImageUrl(art_map)
      .onGlobeReady(() => {
        console.log("Globe is ready");
      })
      // .pointOfView(74.50342658528442, 15.869407619709492)
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .htmlElementsData(gData)
      .htmlElement((d) => {
        const el = Marker({ marker, url: d.url, navigate, detRef });
        return el;
      })(document.getElementById("globeViz"));

    world.controls().enableZoom = false;
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;
    // world.controls().minDistance = 100;
    // world.controls().maxDistance = 10;
  }, [navigate]);
  return (
    <>
      {loading && <PreLoader />}
      <div className="w-[100vw] h-[100vh] absolute top-0 z-50">
        <p className="absolute bottom-12 left-16 z-50">
          <img src={logo} className="md:h-32 mr-44 h-20" alt="Aura Logo" />
        </p>
        <div
          id="globeViz"
          className="w-[100vw] z-10 []"
          onChange={() => setLoading(false)}
        ></div>
        <div
          ref={detRef}
          className="w-[25vw] absolute right-20 top-[25vh] bg-white rounded-lg z-50 p-10 hidden"
        >
          <p>
            {/* {el.title} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            delectus asperiores maxime incidunt sunt corrupti debitis adipisci,
            labore error quam odit. Quasi aspernatur nulla odit incidunt porro
            perferendis velit eos?
          </p>
        </div>
      </div>
    </>
  );
};

export default GlobeComponent;