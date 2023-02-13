import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Map = ({ svgMap }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.select("circle").on("click", function () {
      console.log("Circle clicked");
    });
  }, []);

  return (
    <div>
      <svg ref={svgRef} dangerouslySetInnerHTML={{ __html: svgMap }} />
    </div>
  );
};

export default Map;
