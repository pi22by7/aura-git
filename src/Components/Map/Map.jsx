import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import world from "./world.svg";

const Map = () => {
  const zoomRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(zoomRef.current)
      .append("svg")
      .classed("w-11/12 h-full grid grid-cols-1 justify-items-center", true);

    const image = svg
      .append("image")
      .attr("xlink:href", world) //https://via.placeholder.com/1920x1080
      .classed("w-full h-full", true);

    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 10])
      .on("zoom", (e) => {
        image.attr("transform", e.transform);
      });

    svg.call(zoom);

    return () => {
      svg.remove();
    };
  }, []);

  return (
    <div
      className="mt-10 grid justify-items-center align-center w-screen h-screen3/4"
      ref={zoomRef}
    />
  );
};

export default Map;
