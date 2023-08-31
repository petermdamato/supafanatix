import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import weights from '../../assets/data/weights'

const VisualGlossaryChart = ({ data,artist }) => {
  data = data.filter(entry=>entry.category==="visual")
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = 600;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 40, left: 0 };

    d3.select(svgRef.current).selectAll("g").remove();
    d3.select(svgRef.current).selectAll("circle").remove();
    
    svg.attr('width', width);
    svg.attr('height', height);


    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([.2, .7])
      .range([height - margin.bottom, margin.top]);

    // Create the axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width/2 - margin.right)
      .attr('y', -6)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'end')
      .text('Visual prevalence for ' + artist + ' →')
      .style('fill', 'white')
      .style('font-family', 'Signika')
      .attr('font-size', 14)
      .style('font-weight', 500)

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('y', 6)
      .attr('dy', '1em')
      .attr('dx', (height/-2) - 50)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'end')
      .text('Hitmaker qualities →')
      .style('font-family', 'Signika')
      .attr('transform', 'rotate(-90)')
      .style('fill', 'white')
      .attr('font-size', 14)
      .style('font-weight', 500)

    // Create the scatter plot points
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.value))
      .attr('cy', (d) => {
        let weight;
        if (weights["data"].find((entry)=>{
                  return entry.descriptor===d.descriptor})) {
          weight = weights["data"].find((entry)=>{
                  return entry.descriptor===d.descriptor}).weight
        } else {
          weight = 0.2
        }
        return yScale(weight)
      })
      .attr('r', 5)
      .style('fill', '#8884d8')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)

    // Handle mouseover event
    function handleMouseOver(d) {
      const label = d3.select("."+d.target.__data__.descriptor.split(" ").join("_"));
      label.transition().duration(200).style('opacity', 1);
    }

    // Handle mouseout event
    function handleMouseOut(d) {
      const label = d3.select("."+d.target.__data__.descriptor.split(" ").join("_"));
      label.transition().duration(200).style('opacity', 0);
    }

    // Create the scatter plot points
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', (d)=>{
        return 'label ' + d.descriptor.split(" ").join("_")})
        .attr('x', (d)=>{
          if (d.value > 50) {
            return xScale(d.value) - 10
          } else {
            return xScale(d.value) + 10
          }
        })
        .attr('y', (d) => {
        let weight;
        if (weights["data"].find((entry)=>{
                  return entry.descriptor===d.descriptor})) {
          weight = weights["data"].find((entry)=>{
                  return entry.descriptor===d.descriptor}).weight
        } else {
          weight = 0.2
        }
        return yScale(weight) + 4
      })
        .style('text-anchor', (d)=>{
          if (d.value > 50) {
            return 'end'
          } else {
            return 'start'
          }
        })
            .style('fill', 'white')
      .style('font-family', 'Signika')
      .text((d)=>{
        return d.descriptor
      })
      .style('opacity', 0)

  }, [data,artist]);

  return <svg ref={svgRef}></svg>;
};

export default VisualGlossaryChart;