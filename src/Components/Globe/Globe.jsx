import { useEffect } from "react";
import Globe from "globe.gl";
import data from "../../Dataset/global_pop.json";

const GlobeComponent = () => {
  useEffect(() => {
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
      <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
      Population: <i>${d.POP_EST}</i>
    `
      )
      .onHexPolygonHover((hexPolygon, prevObject) => {
        // console.log(hexPolygon);
        // console.log(prevObject);
      })
      .onHexPolygonClick((polygon, event, { lat, lng }) => {
        console.log(polygon);
        console.log(event);
        console.log(lat, lng);
      })(document.getElementById("globeViz"));
  }, []);
  return (
    <div className="w-[100vw] h-[100vh] absolute top-0 z-50">
      <div id="globeViz" className="w-[100vw]"></div>
    </div>
  );
};

export default GlobeComponent;
