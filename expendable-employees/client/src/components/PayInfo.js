import React from "react";
import rd3 from 'react-d3-library';
import {makeStyles, Button, Toolbar } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";
import * as d3 from 'd3'; 
import myNode from './PayInfoGraph'
import Title from "../components/Title";

const RD3Component = rd3.Component;


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

//Hardcoded test data
const schedulerData = [
    {startDate: '2021-04-12T08:30', endDate: '2021-04-12T12:10', title: 'Shift'}, // 0
    {startDate: '2021-04-13T10:00', endDate: '2021-04-13T14:00', title: 'Shift'}, // 1
    {startDate: '2021-04-15T09:45', endDate: '2021-04-15T12:00', title: 'Shift'}, // 2 
    {startDate: '2021-04-17T08:00', endDate: '2021-04-17T20:00', title: 'Shift'}, // 3
    {startDate: '2021-04-18T08:00', endDate: '2021-04-18T12:00', title: 'Shift'}, // 4
    {startDate: '2021-04-19T10:00', endDate: '2021-04-19T14:00', title: 'Shift'}, // 5
    {startDate: '2021-04-21T09:45', endDate: '2021-04-21T12:00', title: 'Shift'}, // 6
    {startDate: '2021-04-22T08:00', endDate: '2021-04-22T20:00', title: 'Shift'}, // 7
];

var currDay = 4;

var maxDailyMoney = 15;

var hourlyRate = 3.75;

function shiftDuration(start, end){

        let myStart = [parseInt(start.slice(11).slice(0,2)), parseInt( start.slice(11).slice(3))]
        let myEnd = [parseInt(end.slice(11).slice(0,2)), parseInt( end.slice(11).slice(3))]
        

        //console.log(myStart)
        //console.log(myEnd)

        let myHours = myEnd[0] - myStart[0]
        let myMins = myEnd[1] - myStart[1]

        if(myMins < 0){
            myHours -= 1;
            myMins += 60;
        }

        let myDur = [myHours, myMins]


        return myDur

}

function calcPay(duration, rate){

        let myPay = (duration[0] * rate ) + parseInt(((duration[1]/60) * rate * 100))/100
        //we round down on the penny because fuck our employees 

        //console.log(myPay)

        if(myPay > maxDailyMoney){
            maxDailyMoney = parseInt(myPay)
        }

        return myPay

}


function calcTotalPay(){

    console.log('test3')
    return function(){
        generateGraph()
        //console.log('test')
        let totalPay = 0.0;
        for(let i = 0; i < schedulerData.length; i ++){
            totalPay += calcPay(shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate), hourlyRate)
        }

        document.getElementById('totalMoney').innerText = '$' + totalPay

        console.log(document.getElementById('totalMoney'))

        console.log(totalPay)
    }
}

const data = {}
function generateGraph(){
    //so seth suggested this library thing that'd help make D3 and React play nice
    //but I can't really figure out how to use it, so imma not for now 
    let myData = []

    for(let i = 0; i < schedulerData.length; i ++){
        myData.push({day:i, pay: calcPay(shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate), hourlyRate)})
    }
    
    let myGraph = document.getElementById('myGraph');

    console.log(myData)
    
    console.log(myGraph.childElementCount)

    while(myGraph.childElementCount > 0){
        myGraph.removeChild(myGraph.childNodes[0])
    }

    console.log(data)

    const margin = 50;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    const colourScale = d3.scaleLinear().domain([0, maxDailyMoney]).range(['red', 'blue']);

    const xScale = d3.scaleBand() // discrete, bucket
                        .domain(myData.map((data) => data.day))
                        .range([0, chartWidth])
                        .padding(0.3);
    
    const yScale = d3.scaleLinear().domain([0, maxDailyMoney]).range([chartHeight, 0]);

    let svg = d3.select('#myGraph')
                    .append('svg')
                        .attr('width', width)
                        .attr('height', height);

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin)
        .attr('text-anchor', 'middle')
        .text('Money earned by day');

    let g = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);

    g.append('g').call(d3.axisLeft(yScale));

    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));

    let rectangles = g.selectAll('rect')
        .data(myData)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.day))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => colourScale(data.pay))
                .on('mouseenter', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.5);
                })
                .on('mouseleave', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1.0);
                });

    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.pay))
        .attr('y', (data) => yScale(data.pay))
        .duration(1000)
        .delay((data, index) => index * 50);

}



export default function PayInfo() {
    const classes = useStyles();
    console.log('test1')
    calcTotalPay()
    console.log('test2')


    return(
        <React.Fragment>

            <Container height="100%">


                <Grid container spacing = {3} >
                    <Grid item xs>
                        
                        <Button onClick={calcTotalPay()}> test button</Button>
                        
                        {/* graph will go here */}
                        <div id='myGraph'></div>
                    </Grid>

                    <Grid item xs>
                        {/* will contain total money per pay period
                        and next payday date  */}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Title>Total</Title>
                                </TableRow>
                                <TableRow>
                                    <Title ><div id='totalMoney'>$0.00</div></Title>
                                </TableRow>
                                <TableRow>
                                    <Title>Payday</Title>
                                </TableRow>
                                <TableRow>
                                    <Title ><div id ='nextPayday'>Never </div></Title>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>

                </Grid>
            </Container>

            <Typography>Lol you don't get paid </Typography>
        </React.Fragment>
    )

}