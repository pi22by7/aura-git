import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gData from "./gData.json";
import welcome from "../../Assets/welcome.png";
import logo from "../../Assets/logo.png";
import marker from "./marker.png";
import one from "./legend/11.png";
import two from "./legend/Registration.png";
import three from "./legend/Competitions.png";
import four from "./legend/Rulebook.png";
import five from "./legend/Schedule.png";
import six from "./legend/Profile.png";
import seven from "./legend/Contact.png";
import eight from "./legend/Developer.png";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createSphere, stars } from "./Assets/Sphere";
import { glowGeometry, createGlowMaterial } from "./Assets/Glow";

const GlobeComponent = () => {
  const [loading, setLoading] = useState(true);
  const [animationId, setAnimationId] = useState(null);
  const mapRef = useRef(null);
  let sphere = null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!sphere) return;
    else if (sphere.geometry !== undefined && sphere.material !== undefined)
      setTimeout(() => setLoading(false), 1500);
  }, [sphere]);

  useEffect(() => {
    // create a globe using three.js
    var markerTexture = new THREE.TextureLoader().load(marker);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    let glow_Scale = window.innerWidth > 600 ? 1.03 : 0.65;
    let radius = window.innerWidth > 600 ? 2.5 : 1.5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector("#globeViz").appendChild(renderer.domElement);

    // Create a sphere
    sphere = createSphere(radius);

    // Add a blue glow to the sphere only on outside edges
    const glowMaterial = createGlowMaterial(camera);
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 0, 0);
    glow.scale.set(glow_Scale, glow_Scale, glow_Scale);
    sphere.add(glow);

    // Add directional light to a sphere of radius 2.5
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 500, 600);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    // Create an ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    scene.add(sphere);
    scene.add(stars);

    // Add markers on sphere for each country in g_data based on lat and long
    // function latLongToVector3(lat, lon, radius) {
    //   var phi = (lat * Math.PI) / 180;
    //   var theta = ((lon - 180) * Math.PI) / 180;

    //   var x = -radius * Math.cos(phi) * Math.cos(theta);
    //   var y = radius * Math.sin(phi);
    //   var z = radius * Math.cos(phi) * Math.sin(theta);

    //   return new THREE.Vector3(x, y, z);
    // }

    for (var i = 0; i < gData.length; i++) {
      // var markerLocation = gData[i];
      // var positionL = latLongToVector3(
      //   markerLocation.lat,
      //   markerLocation.lng,
      //   2.57
      // );
      // var positionM = latLongToVector3(
      //   markerLocation.lat,
      //   markerLocation.lng,
      //   1.57
      // );
      // gData[i].positionL = positionL;
      // gData[i].positionM = positionM;
      // const { title, url } = gData[i];
      const { title, positionL, positionM, url } = gData[i];
      const position = window.innerWidth > 600 ? positionL : positionM;
      // Create a sprite with the marker texture
      var spriteMaterial = new THREE.SpriteMaterial({
        map: markerTexture,
        sizeAttenuation: false,
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      let size = (window.innerWidth > 600 ? 50 : 50) / window.innerHeight;
      sprite.scale.set(size, size, 0);
      // Set user data for the sprite
      sprite.userData = { title, url, navigate };
      sprite.position.set(position.x, position.y, position.z);

      // Add the sprite to the scene
      sphere.add(sprite);
    }

    // create a new raycaster
    const raycaster = new THREE.Raycaster();

    // add an onclick event listener to the sprite
    document.addEventListener("mousedown", onMouseDown, false);

    function onMouseDown(event) {
      // calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // set raycaster origin and direction
      raycaster.setFromCamera(mouse, camera);

      // Find intersections
      const intersects = raycaster.intersectObjects(sphere.children);

      // check for intersections with the sprite
      for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];

        // check if the intersected object is a sprite
        if (intersect.object instanceof THREE.Sprite) {
          // do something with the sprite
          handleClick(intersect.object);
        }
      }
    }

    function handleClick(sprite) {
      const { title, url, navigate } = sprite.userData;
      navigate(url);
    }

    // Add on hover event listener to the sprite
    document.addEventListener("mousemove", onMouseMove, false);

    function onMouseMove(event) {
      // calculate mouse position in normalized device coordinates
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // set raycaster origin and direction
      raycaster.setFromCamera(mouse, camera);

      // Find intersections
      const intersects = raycaster.intersectObjects(sphere.children);

      // check for intersections with the sprite
      for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];

        // check if the intersected object is a sprite
        if (intersect.object instanceof THREE.Sprite) {
          // do something with the sprite
          handleHover(intersect.object);
        }
      }
    }

    function handleHover(sprite) {
      const { title, url, navigate } = sprite.userData;
    }

    const animate = function () {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.001;
    };
    animate();

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;
    controls.enablePan = true;
    controls.maxDistance = 5;
    controls.minDistance = 4;
    controls.update();

    //  Cleanup
    return () => {
      document.querySelector("#globeViz")?.removeChild(renderer.domElement);
      // Scene cleanup
      scene.remove(sphere);
      scene.remove(stars);
      scene.remove(glow);
      scene.remove(sprite);
      // Renderer cleanup
      renderer.dispose();
      // Controls cleanup
      controls.dispose();
      // Geometry cleanup
      sphere.geometry.dispose();
      glowGeometry.dispose();
      // Material cleanup
      sphere.material.dispose();
      glowMaterial.dispose();
      spriteMaterial.dispose();
      // Texture cleanup
      markerTexture.dispose();
      // Camera cleanup
      camera.remove(controls);
      camera.remove(animate);
      // Remove event listeners
      document.removeEventListener("mousedown", onMouseDown, false);
      document.removeEventListener("mousemove", onMouseMove, false);
    };
  }, []);

  return (
    <>
      {loading === true && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-white absolute top-0 z-50">
          <img
            src={welcome}
            className="mr-3 md:h-96 h-64"
            alt="Aura Logo"
            draggable={false}
          />
        </div>
      )}
      <div className="w-[100vw] h-[100vh] absolute top-0 z-40">
        <p className="absolute lg:invisible visible bottom-8 right-1/2 transform translate-x-1/2 z-40">
          <img src={logo} className="h-28" alt="Aura Logo" draggable={false} />
        </p>
        <div
          id="globeViz"
          className="w-[100vw] h-[100vh] z-10"
          ref={mapRef}
        ></div>

        {!loading && (
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
