import { useEffect } from "react";
import Globe from "globe.gl";
import data from "./realgeo.json";
import map from "./map.jpg";
import earth from "./earth.png";
import art_map from "./art_map.png";
// import art_map from "./art_map.svg";
// data.features = data.features.map((f) => {
//   return {
//     // ...f,
//     properties: {
//       NAME: f.properties.NAME,
//       CONTINENT: f.properties.CONTINENT,
//     },
//     geometry: {
//       ...f.geometry,
//     },
//   };
// });
// console.log(data);

const GlobeComponent = () => {
  useEffect(() => {
    const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;
    // const markerSvg = `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 241 260" enable-background="new 0 0 241 260" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="227.822,63.335 215.884,64.816 195.815,80.809 197.159,87.984 179.343,90.9 171.988,87.529 170.643,79.845 163.422,80.02 165.128,93.27 146.79,93.703 121.821,86.002 100.271,74.179 106.398,62.15 90.884,51.603 89.61,41.434 93.782,43.975 98.261,41.155 93.118,31.532 102.741,22.739 104.772,15.626 97.113,12.953 82.998,15.439 68.397,2 52.291,3.126 47.145,9.69 58.727,18.336 55.858,21.297 52.997,21.914 52.814,35.434 63.024,41.67 34.41,80.535 22.268,79.373 14.591,89.807 26.46,109.512 17.324,113.75 7.186,112.018 2.289,116.552 10.581,125.209 9.784,132.863 23.954,145.028 24.25,144.8 37.85,140.7 39.582,147.898 39.855,169.221 58.216,223.805 62.682,232.394 68.741,252.441 73.594,258 82.205,257.339 83.845,251.986 98.311,235.424 98.311,233.897 98.015,226.243 98.357,225.15 102.366,211.822 101.957,211.572 102.116,211.185 102.366,211.822 102.207,211.048 100.157,197.766 101.957,191.866 134.397,168.287 140.16,160.633 143.737,154.984 153.578,152.455 162.076,137.579 167.497,134.252 175.448,136.394 168.5,105.412 168.181,93.908 177.999,95.798 179.594,102.428 184.265,104.774 200.826,105.002 199.186,109.284 200.621,116.712 204.198,130.198 210.167,121.153 208.959,113.112 214.745,113.727 218.96,99.625 222.879,88.44 234.451,81.128 238.711,74.794 "></polygon> </g></svg>`;
    // const markerSvg = India;
    // Gen random data
    const N = 30;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: 7 + Math.random() * 30,
      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    }));
    // const gData = data.features.map((feature) => {
    //   const lat = feature.geometry.coordinates[1];
    //   const lng = feature.geometry.coordinates[0];
    //   const name = feature.properties.Prop;

    //   return {
    //     lat,
    //     lng,
    //     element: `<div><a href="#">${name}</a></div>`,
    //   };
    // });
    // eslint-disable-next-line no-unused-vars
    const world = Globe()
      .globeImageUrl(art_map)
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      //   .hexPolygonsData(data.features)
      //   .hexPolygonResolution(3)
      //   .hexPolygonMargin(0.3)
      //   .hexPolygonColor(
      //     () =>
      //       `#${Math.round(Math.random() * Math.pow(2, 24))
      //         .toString(16)
      //         .padStart(6, "0")}`
      //   )
      //   .hexPolygonLabel(
      //     ({ properties: d }) => `
      //   <b>${d.Prop}</b> <br />
      // `
      //   )
      .htmlElementsData(gData)
      .htmlElement((d) => {
        const el = document.createElement("a");
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        console.log(el);
        // el.onclick = () => console.info(d);
        return el;
      })(document.getElementById("globeViz"));

    world.controls().enableZoom = false;
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 2.5;
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] absolute top-0">
      <p className="text-5xl text-white font-extrabold absolute bottom-5 left-5 z-50">
        AURA
      </p>
      <div id="globeViz" className="w-[100vw] z-10"></div>
    </div>
  );
};

export default GlobeComponent;
