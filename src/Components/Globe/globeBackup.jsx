import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Marker from "./Marker/Marker";
// import Globe from "globe.gl";
import PreLoader from "../PreLoader/PreLoader";
import gData from "./gData.json";
import art_map from "./map.png";
import night_sky from "./night-sky.png";
import logo from "../../Assets/logo.png";
import one from "./legend/11.png";
import two from "./legend/Registration.png";
import three from "./legend/Competitions.png";
import four from "./legend/Rulebook.png";
import five from "./legend/Schedule.png";
import six from "./legend/Profile.png";
import seven from "./legend/Contact.png";
import eight from "./legend/Developer.png";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Texture } from "three";

const Sphere = () => {
  const base = new THREE.TextureLoader().load(art_map);

  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.005));

  return (
    <mesh visible castShadow ref={ref}>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2.5, 100, 100]} />
      <meshBasicMaterial map={base} color="white" />
    </mesh>
  );
};

const Stars = () => {
  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = Math.random() * 2000;
    starVertices.push(x, y, z);
  }
  const starGeomerty = new THREE.BufferGeometry();
  starGeomerty.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
  });
  const stars = new THREE.Points(starGeomerty, starMaterial);

  return <mesh visible castShadow geometry={starGeomerty}></mesh>;
};

const GlobeComponent = () => {
  const [loading, setLoading] = useState(true);
  // const texture = new THREE.TextureLoader().load(night_sky);
  // const sphereGeometry = new THREE.SphereGeometry(10, 64, 64);
  // const material = new THREE.MeshBasicMaterial({ map: texture });
  const mapRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      {loading === true && <PreLoader type="welcome" />}
      <div className="w-[100vw] h-[100vh] absolute top-0 z-40">
        <p className="absolute lg:invisible visible bottom-8 right-1/2 transform translate-x-1/2 z-40">
          <img src={logo} className="h-28" alt="Aura Logo" draggable={false} />
        </p>
        {/* <div
          id="globeViz"
          className="w-[100vw] h-[100vh] z-10"
          ref={mapRef}
        ></div> */}
        <Canvas style={{ zIndex: 10 }}>
          <camera position={[0, 0, 5]} />
          <ambientLight />
          <Sphere />
          <Stars />
          <OrbitControls />
        </Canvas>
        {loading && (
          <>
            <div className="lg:w-52 w-28 absolute lg:top-1/2 top-5 transfrom lg:-translate-y-1/2 lg:right-14 right-5 rounded-lg z-40 ">
              <div className="h-fit flex flex-col justify-center items-center">
                <a href="/" className="lg:contents hidden">
                  <img src={one} alt="legend" draggable={false} />
                </a>
                <a href="/#/login">
                  <img
                    src={two}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/competitions">
                  <img
                    src={three}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/rule-book">
                  <img
                    src={four}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/schedule">
                  <img
                    src={five}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/profile">
                  <img
                    src={six}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/contact-us">
                  <img
                    src={seven}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
                <a href="/#/dev-team">
                  <img
                    src={eight}
                    alt="legend"
                    draggable={false}
                    className="my-1"
                  />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GlobeComponent;
