import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => kelvin - 273.15;

const Chart = ({ data }) => {
  console.log(data);

  const svgRef = useRef();

  useEffect(() => {
    const drawChart = () => {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d, i) => i.toString()))
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(data, (d) => kelvinToCelsius(d.main.temp))]);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(i.toString()))
        .attr("y", (d) => y(kelvinToCelsius(d.main.temp)))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(kelvinToCelsius(d.main.temp)))
        .attr("fill", "blue");

      // Add x-axis
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add y-axis
      svg.append("g").call(d3.axisLeft(y));
    };

    if (data && data.length > 0) {
      drawChart();
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-center my-5">
        <h1 className="block">Data of Last 5 Days</h1>
      </div>
      <div className="flex justify-center">
        <svg ref={svgRef}></svg>;
      </div>
    </>
  );
};

export default Chart;
