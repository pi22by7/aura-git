import { useEffect } from "react";
import Globe from "globe.gl";
import data from "../../Dataset/global_pop_cleaned.json";

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
    const N = 30;
    const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: 7 + Math.random() * 30,
      color: ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    }));
    const world = Globe()
      .globeImageUrl(
        "https://unpkg.com/three-globe@2.25.1/example/img/earth-dark.jpg"
      )
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
      <b>${d.NAME}</b> <br />
      Contintent: <i>${d.CONTINENT}</i>
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
        const el = document.createElement("div");
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
    <div className="w-[100vw] h-[100vh] absolute top-0 z-50">
      <div id="globeViz" className="w-[100vw]"></div>
    </div>
  );
};

export default GlobeComponent;
