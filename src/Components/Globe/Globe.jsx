import { useEffect } from "react";
import Globe from "globe.gl";
import data from "./realgeo.json";
import map from "./map.jpg";
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

    // Gen random data
    // const N = 30;
    // const gData = [...Array(N).keys()].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   size: 7 + Math.random() * 30,
    //   color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    // }));
    const gData = data.features.map((feature) => {
      const lat = feature.geometry.coordinates[1];
      const lng = feature.geometry.coordinates[0];
      const name = feature.properties.Prop;

      return {
        lat,
        lng,
        element: `<div><a href="#">${name}</a></div>`,
      };
    });
    // eslint-disable-next-line no-unused-vars
    const world = Globe()
      .globeImageUrl(map)
      .hexPolygonsData(data.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.3)
      .hexPolygonColor(
        () =>
          `#${Math.round(Math.random() * Math.pow(2, 24))
            .toString(16)
            .padStart(6, "0")}`
      )
      .hexPolygonLabel(
        ({ properties: d }) => `
      <b>${d.Prop}</b> <br />
    `
      )
      .onHexPolygonHover((hexPolygon, prevObject) => {
        // console.log(hexPolygon);
        // console.log(prevObject);
      })
      .onHexPolygonClick((polygon, event, { lat, lng }) => {
        // console.log(polygon);
        // console.log(event);
        // console.log(lat, lng);
      })
      .htmlElementsData(gData)
      .htmlElement((d) => {
        const el = document.createElement("a");
        el.innerHTML = markerSvg;
        el.style.color = d.color;
        el.style.width = `${d.size}px`;

        el.style["pointer-events"] = "auto";
        el.style.cursor = "pointer";
        // el.onclick = () => console.info(d);
        return el;
      })(document.getElementById("globeViz"));
  }, []);
  return (
    <div className="">
      <div id="globeViz" className="w-[100vw]"></div>
    </div>
  );
};

export default GlobeComponent;
