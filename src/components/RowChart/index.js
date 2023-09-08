import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RowChart = ({ data,setWidth,name }) => {

  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 30, right: 10, bottom: 4, left: 160 };
    const width = setWidth - margin.left - margin.right;
    const height = 14 * 20 - margin.top - margin.bottom;
    
    if (data.length > 10) {
      data=data.slice(0,10)
    }
    data = data.map(entry =>{
      entry.value = entry.value*-1
      return entry
    })

    data = data.sort((a,b)=>{
      return b.value-a.value
    })
    
    d3.select(chartRef.current).select("svg").remove();
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.brand))
      .range([0, height])
      .padding(0.2);

    svg
      .append('text')
      .attr('class', 'brandmatch-chart-headline')
      .attr('x', -116)
      .attr('y', -12)
      .attr('text-anchor', 'beginning')
      .text(name)
      .style('font-family', 'Signika')
      .style('text-transform', 'uppercase')
      .style('font-size', 20)
      .style('fill', 'white');

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', d => `translate(0, ${yScale(d.brand)})`);

    svg
      .selectAll('.bar-group')
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', d => xScale(d.value))
      .attr('height', yScale.bandwidth())
      .attr('fill', '#63846E');

    svg
      .selectAll('.bar-group')
      .append('rect')
      .attr('class', 'rounded-corner')
      .attr('x', d => xScale(d.value) - yScale.bandwidth() / 2)
      .attr('y', 0)
      .attr('width', yScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', '#63846E')
      .attr('rx', yScale.bandwidth() / 2) // Set rx to half of the bar height for rounding
      .attr('ry', yScale.bandwidth() / 2); // Set ry to half of the bar height for rounding

    svg
      .selectAll('.label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', -10)
      .attr('y', d => yScale(d.brand) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-family', 'Signika')
      .style('font-size', (d)=>{
        if (d.brand.length>15) {
          return 12
        } else {
          return 18
        }
      })
      .style('text-transform', 'uppercase')
      .style('fill', 'white')
      .text(d => {
        if (d.brand === "mercedes_benz"||d.brand === "coca_cola"){
                return d.brand.replaceAll('_','-')}else  if (d.brand.includes("&")) {
                  return d.brand.replaceAll('_',' ')
                }else{
        return d.brand.replaceAll('_',' ')
      }
      });

  }, [data]);

  return <div ref={chartRef} className="row-chart"></div>;
};

export default RowChart;