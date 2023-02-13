import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Map = () => {
  const zoomRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(zoomRef.current)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    const image = svg
      .append("image")
      .attr("xlink:href", "https://via.placeholder.com/500x500")
      .attr("width", 500)
      .attr("height", 500);

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

  return <div ref={zoomRef} />;
};

export default Map;
