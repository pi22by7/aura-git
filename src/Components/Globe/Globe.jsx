import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import mapData from "./countries-50m.json";
import { feature } from "topojson";
// import brazil from "./brazil.png";
// import mexico from "./mexico.png";
// import { feature } from "topojson";

// function Globe() {
//   const svgRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);

//     // Set the width and height of the SVG element
//     const width = 800;
//     const height = 600;
//     svg.attr("width", width).attr("height", height);

//     // Create a projection to convert the map coordinates to SVG coordinates
//     const projection = d3.geoMercator().fitSize([width, height], mapData);

//     // Create a path generator to draw the map
//     const pathGenerator = d3.geoPath().projection(projection);

//     // Define the patterns to use for filling the country polygons
//     const defs = svg.append("defs");
//     defs
//       .append("pattern")
//       .attr("id", "brazil")
//       .attr("patternUnits", "userSpaceOnUse")
//       .attr("width", 20)
//       .attr("height", 20)
//       .append("image")
//       .attr("xlink:href", brazil)
//       .attr("width", 20)
//       .attr("height", 20);
//     defs
//       .append("pattern")
//       .attr("id", "mexico")
//       .attr("patternUnits", "userSpaceOnUse")
//       .attr("width", 20)
//       .attr("height", 20)
//       .append("image")
//       .attr("xlink:href", mexico)
//       .attr("width", 20)
//       .attr("height", 20);

//     // Add the country polygons to the map
//     svg
//       .selectAll("path")
//       .data(feature(mapData, mapData.objects.countries).features)
//       .enter()
//       .append("path")
//       .attr("d", pathGenerator)
//       .style("fill", (d) => {
//         if (d.properties.name === "Brazil") {
//           return "url(#brazil)";
//         } else if (d.properties.name === "Mexico") {
//           return "url(#mexico)";
//         } else {
//           return "#ccc"; // default fill color
//         }
//       });
//   }, []);

//   return (
//     <svg ref={svgRef}>
//       <g />
//     </svg>
//   );
// }

// export default Globe;

function Globe() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set the width and height of the SVG element
    const width = 800;
    const height = 600;
    svg.attr("width", width).attr("height", height);

    // Create a projection to convert the map coordinates to SVG coordinates
    const projection = d3.geoMercator().fitSize([width, height], mapData);

    // Create a path generator to draw the map
    const pathGenerator = d3.geoPath().projection(projection);

    // Add the country polygons to the map
    svg
      .selectAll("path")
      .data(feature(mapData, mapData.objects.countries).features)
      .enter()
      .append("path")
      .append("path")
      .attr("d", pathGenerator);
  }, []);

  return (
    <svg ref={svgRef}>
      <g />
    </svg>
  );
}

export default Globe;
