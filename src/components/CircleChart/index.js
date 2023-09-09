import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircleChart = ({ data,setWidth,name }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data[0]) {
    const svg = d3.select(svgRef.current);

    const width = setWidth;
    const height = 180;
    const circleRadius = 10;
    const lineY = height / 2;
    const margin = { top: 10, right: 20, bottom: 20, left: 160 };
    
    d3.select(svgRef.current).selectAll("g").remove();
    d3.select(svgRef.current).selectAll("text").remove();
    
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

      const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);

      data.forEach((row, rowIndex) => {

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
          .text(row.descriptor);
        if (rowIndex === 0) {
            circleGroup
              .append('text')
              .attr('dx', ()=>{
                if (row.artistVal > row.brandVal) {
                  return xScale(row.artistVal)
                } else {
                  return xScale(row.brandVal) 
                }
              })
              .attr('dy', lineY - 16)
              .style('fill', 'white')
              .style('opacity', 1)
              .attr("font-size", 10)
              .attr("text-anchor", "middle")
              .text("HIGH")
            circleGroup
              .append('text')
              .attr('dx', ()=>{
                if (row.artistVal < row.brandVal) {
                  return xScale(row.artistVal)
                } else {
                  return xScale(row.brandVal) 
                }
              })
              .attr('dy', lineY - 16)
              .style('fill', 'white')
              .style('opacity', 1)
              .attr("font-size", 10)
              .attr("text-anchor", "middle")
              .text("LOW")
          }

        circleGroup
          .append('rect')
          .attr('x', 0)
          .attr('height', 1)
          .attr('y', lineY)
          .attr('width', ()=>{
            return d3.max([xScale(row.brandVal),xScale(row.artistVal)])
          })
          .style('fill', 'white')
          .style('opacity', 0.2)
        circleGroup
            .append('circle')
            .attr('cx', xScale(row.artistVal))
            .attr('cy', lineY)
            .attr('r', circleRadius)
            .style('fill', '#C54577');
        circleGroup
            .append('circle')
            .attr('cx', xScale(row.brandVal))
            .attr('cy', lineY)
            .attr('r', circleRadius)
            .style('fill', '#63846E');
      })



    }



  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CircleChart