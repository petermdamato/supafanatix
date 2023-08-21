import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircleChart = ({ data,setWidth,name }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = setWidth;
    const height = 180;
    const circleRadius = 10;
    const lineY = height / 2;
    const margin = { top: 10, right: 20, bottom: 20, left: 160 };

    svg.attr('width', width + margin.left + margin.right);
    svg.attr('height', height + margin.top + margin.bottom);

    svg
      .append('text')
      .attr('class', 'brandmatch-chart-headline')
      .attr('x', 2)
      .attr('y', 20)
      .attr('text-anchor', 'beginning')
      .text(name)
      .style('font-family', 'Signika')
      .style('text-transform', 'uppercase')
      .style('font-size', 14)
      .style('fill', '#C54577');

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top*-1})`);

    data.forEach((row, rowIndex) => {
      const xScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);

      const circleGroup = g
        .append('g')
        .attr('transform', `translate(0, ${rowIndex * 50})`);

      circleGroup
        .append('text')
        .attr('x', -10)
        .attr('y', lineY + circleRadius - 7)
        .attr('text-anchor', 'end')
        .style('fill', 'white')
        .style('text-transform', 'uppercase')
        .style('font-size', 10)
        .text(row.label);

      circleGroup
        .append('rect')
        .attr('x', 0)
        .attr('height', 1)
        .attr('y', lineY)
        .attr('width', ()=>{
          return d3.max(row.data,(entry)=>{
            return xScale(entry.value)
          })
        })
        .style('fill', 'white')
        .style('opacity', 0.2)
        

      row.data.forEach(({ key, value }) => {
        circleGroup
          .append('circle')
          .attr('cx', xScale(value))
          .attr('cy', lineY)
          .attr('r', circleRadius)
          .style('fill', ()=>{
            if (key === 'artist') {
              return '#C54577'
            } else {
              return '#63846E'
            }
          });

        // circleGroup
        //   .append('text')
        //   .attr('x', xScale(value))
        //   .attr('y', lineY + circleRadius + 10)
        //   .attr('text-anchor', 'middle')
        //   .style('fill', 'white')
        //   .text(key);
      });
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CircleChart