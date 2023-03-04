import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker/Marker";
import Globe from "globe.gl";
import PreLoader from "../PreLoader/PreLoader";
import gData from "./gData.json";
import art_map from "./map.png";
import legend from "./legend_.png";
import legend_mob from "./legend.png";
import logo from "../../Assets/logo.png";

const GlobeComponent = () => {
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const marker = `<svg viewBox="-4 0 36 36">
        <path
          fill="currentColor"
          d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"
        ></path>
        <circle fill="black" cx="14" cy="14" r="7"></circle>
      </svg>`;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      // set laoding after 3 seconds
      setTimeout(() => setLoading(false), 2000);
      // setLoading(false);
    });

    observer.observe(mapRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
      // console.log("touch");
      world.controls().autoRotate = false;
    });
    globeEl.addEventListener("touchend", () => {
      setTimeout(150000);
      // console.log("end");
      world.controls().autoRotate = true;
      world.controls().update();
    });

    let world = Globe({ animateIn: true, waitForGlobeReady: false })
      .globeImageUrl(art_map)
      // .pointOfView(74.50342658528442, 15.869407619709492)
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .htmlElementsData(gData)
      .htmlElement((d) => {
        const el = Marker({
          marker,
          url: d.url,
          title: d.title,
          navigate,
        });
        return el;
      })(document.getElementById("globeViz"));

    world.controls().enableZoom = true;
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 1.0;
    // world.controls().minDistance = 100;
    // world.controls().maxDistance = 10;

    // useEffect cleanup:
    return () => {
      world.controls().dispose();
    };
  }, [marker, navigate]);
  return (
    <>
      {loading === true && <PreLoader type="welcome" />}
      <div className="w-[100vw] h-[100vh] absolute top-0 z-40">
        <p className="absolute md:invisible visible bottom-8 right-1/2 transform translate-x-1/2 z-40">
          <img
            src={logo}
            className="lg:h-40 h-28 mr-28"
            alt="Aura Logo"
            draggable={false}
          />
        </p>
        <div
          id="globeViz"
          className="w-[100vw] h-[100vh] z-10"
          ref={mapRef}
        ></div>
        {!loading && (
          <>
            <div className="lg:w-52 w-28 absolute top-1/2 transfrom -translate-y-1/2 right-14 rounded-lg md:visible invisible">
              <img src={legend} alt="legend" draggable={false} />
            </div>
            <div className="lg:w-52 w-28 absolute top-5 right-5 rounded-lg md:invisible visible">
              <img src={legend_mob} alt="legend" draggable={false} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GlobeComponent;
