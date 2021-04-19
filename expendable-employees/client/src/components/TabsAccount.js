/*
This is going to be the part of the account page that holds the Various buttons and part underneat that has their relevant parts
Quit your Job
Edit Info
Money Information 
Change Password 

*/

import React from "react";
import {makeStyles, Button, Grid, Paper } from '@material-ui/core/';
import * as d3 from 'd3'; 

import QuitJob from "./QuitJob";
import EditInfo from "./EditInfo";
import PayInfo from "./PayInfo";
import ChangePass from "./ChangePass";
import {getUserToken} from "../utils/userSession";
import axios from "axios";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
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
            maxDailyMoney = parseInt(myPay) + 5
        }

        return myPay

}


function calcTotalPay(){

    console.log('test3')
        generateGraph()
        //console.log('test')
        let totalPay = 0.0;
        let totalHours = 0;
        let totalMinutes = 0;
        for(let i = 0; i < schedulerData.length; i ++){
            totalHours += shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate)[0]
            totalMinutes += shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate)[1]
            totalPay += calcPay(shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate), hourlyRate)
        }

        while(totalMinutes >= 60){
            totalHours += 1;
            totalMinutes -= 60;
        }

        document.getElementById('totalMoney').innerText = '$' + totalPay

        document.getElementById('hoursWorked').innerText = totalHours + ':' + totalMinutes;

        document.getElementById('hourlyRate').innerText = '$' + hourlyRate + ' / hr';

        console.log(document.getElementById('totalMoney'))

        console.log(totalPay)
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
    const colourScale = d3.scaleLinear().domain([0, maxDailyMoney]).range(['grey', 'white']);

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
        .attr('fill', 'white')
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


const buttonOptions = [
    {buttonLabel: 'Quit Job', component:'QuitJobComponent'},
    {buttonLabel: 'Edit Info', component:'EditInfoComponent'},
    {buttonLabel: 'Payment Info', component:'PayInfoComponent'},
    {buttonLabel: 'Change Password', component:'ChangePassComponent'}
]

const handleFireSelected = () => {
    console.log(getUserToken())
    //so all i think this needs now is something like fireEmployee(getUserToken()) or something like that 
    
}    



function loadComponent(myComponent){
    return function(){

        if(myComponent === 'QuitJobComponent'){
            console.log('job successfuly quit, happy to see you go!')
            document.getElementById('quitJob').style.display = 'block'
            document.getElementById('editInfo').style.display = 'none'
            document.getElementById('payInfo').style.display = 'none'
            document.getElementById('changePass').style.display = 'none'

            handleFireSelected()


        } else if(myComponent === 'EditInfoComponent'){
            console.log("if you messed up the first time, it's your own fault")
            document.getElementById('quitJob').style.display = 'none'
            document.getElementById('editInfo').style.display = 'block'
            document.getElementById('payInfo').style.display = 'none'
            document.getElementById('changePass').style.display = 'none'
        } else if(myComponent === 'PayInfoComponent'){
            calcTotalPay()
            console.log("you don't get paid, you're an intern")
            document.getElementById('quitJob').style.display = 'none'
            document.getElementById('editInfo').style.display = 'none'
            document.getElementById('payInfo').style.display = 'block'
            document.getElementById('changePass').style.display = 'none'
        } else if(myComponent === 'ChangePassComponent'){
            console.log('you shoud have remembered your old password')
            document.getElementById('quitJob').style.display = 'none'
            document.getElementById('editInfo').style.display = 'none'
            document.getElementById('payInfo').style.display = 'none'
            document.getElementById('changePass').style.display = 'block'
        } 

    }
}


export default function TabsAccount() {
    const classes = useStyles();

    

    return(

        <React.Fragment>
            
            <Paper className={classes.paperStyle}>
                <Grid container justify="space-evenly">{buttonOptions.map((option) => (
                    <Grid item>
                        <Button onClick= {loadComponent(option.component)}>
                            {option.buttonLabel}
                        </Button>
                    </Grid>
                ))}
                </Grid>
            </Paper>
                    
            <div id='quitJob' style={{display:'none'}}>
                <QuitJob></QuitJob>
            </div>

            <div id='editInfo' style={{display:'none'}}>
                <EditInfo></EditInfo>
            </div>
                    
            <div id='payInfo' style={{display:'none'}}>
                <PayInfo></PayInfo>
            </div>

            <div id='changePass' style={{display:'none'}}>
                <ChangePass></ChangePass>
            </div>

        </React.Fragment>
    )

}