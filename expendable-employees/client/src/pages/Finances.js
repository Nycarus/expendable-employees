import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as d3 from 'd3'; 
//you may need to run 'npm install d3 --save'

//this is just placeholder data to have a graph show up
//i really hope this variable name doesn't end up being permanent 
//for now, this is just going to be a simple graph of how many hours worked per day of week
//i wonder if i can get the bars to not start at the bottom, so we can see when the start and end time is 
//also i think it might be easiest to store all times in a 24 hour format instead of 12 hour, no am/pm bullshit
//i think d3 also needs numbers, so imma do hhmm for now without a : in between
const placeholderData1 = [
    {'day': 0, 'start': 700, 'end': 2100},
    {"day": 1, "start": 800, "end": 1500},
    {"day": 2, "start": 1300, "end": 1800},
    {"day": 3, "start": 1100, "end": 2330},
    {"day": 4, "start": 1700, "end": 1730},
    {"day": 5, "start": 2000, "end": 2345},
    {"day": 6, "start": 300, "end": 330},
] //whoever scheduled this person's hours is a terrible human being 


const margin = 50;
const width = 800;
const height = 500;
const chartWidth = width - 2 * margin;
const chartHeight = height - 2 * margin;
const colourScale = d3.scaleLinear()
                        .domain([0, 2359])
                        .range(['#e6e6e4 ', '#5c5c5b']);

const xScale = d3.scaleBand() 
                        .domain(placeholderData1.map((data) => data.day))
                        .range([0, chartWidth])
                        .padding(0.3);

const yScale = d3.scaleLinear()
                        .domain([0, 2359])
                        .range([chartHeight, 0]);


let svg = d3.select('#table1')
                .append('svg')
                    .attr('width', width)
                    .attr('height', height)

svg.append('text')
        .attr('x', width/2)
        .attr('y', margin)
        .attr('text-anchor', 'middle')
        .text('Shift times')

let g = svg.append('g')
                .attr('transform', `translate(${margin}, ${margin})`);

g.append('g')
    .call(d3.axisLeft(yScale));

g.append('g') // i think that having the rectangles not be at the bottom of the graph will be done here 
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale))

let rectangles = g.selectAll('rect')
    .data(placeholderData1)
    .enter()
        .append('rect')
            .attr('x', (data) => xScale(data.end - data.start)) //lets see how this goes 
            .attr('y', (data) => chartHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', (data) => 0)//i think we'll need to do something here, leave it as 0 for now 
            .attr('fill', (data) => colourScale(data.end-data.start)) 
            .on('mouseenter', function(source, index){
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.5)
            })
            .on('mouseleave', function(source, index){
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1.0)
            })

rectangles.transition()
            .ease(d3.easeElastic)
            .attr('height', (data) => chartHeight - yScale(data.end))
            .attr('y', (data) => yScale(data.end))
            .duration(1000)
            .delay((data, index) => index * 50)

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));


export default function Finances() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <div id='table1'></div>
            </main>
        </div>
    );
}