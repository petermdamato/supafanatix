import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const VisualGlossaryChart = ({ data,artist }) => {
  const svgRef = useRef();
  console.log(data)
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 0 };

    svg.attr('width', width);
    svg.attr('height', height);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.index)])
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
      .attr('font-size', 12)
      .attr('font-weight', 'bold');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('y', 6)
      .attr('dy', '1em')
      .attr('dx', height/-2)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'end')
      .text('Hitmaker qualities →')
      .style('font-family', 'Signika')
      .attr('transform', 'rotate(-90)')
      .style('fill', 'white')
      .attr('font-size', 12)
      .attr('font-weight', 'bold');

    // Create the scatter plot points
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.value))
      .attr('cy', d => yScale(d.index))
      .attr('r', 5)
      .style('fill', '#8884d8'); // Customize color as needed

    // Create the scatter plot points
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .classed('label', true)
        .attr('x', (d)=>{
          if (d.value > 50) {
            return xScale(d.value) - 10
          } else {
            return xScale(d.value) + 10
          }
        })
        .attr('y', d => yScale(d.index) + 4 )
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

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default VisualGlossaryChart;