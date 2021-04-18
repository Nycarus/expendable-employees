import React from "react";
import rd3 from 'react-d3-library';
import {makeStyles, Button, Toolbar } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

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

var hourlyRate = 1;

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

        return myPay

}


function calcTotalPay(){
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
    data.width = 500;
    data.height = 750;

    let myData = []

    for(let i = 0; i < schedulerData.length; i ++){
        myData.push({day:i, pay: calcPay(shiftDuration(schedulerData[i].startDate, schedulerData[i].endDate), hourlyRate)})
    }
    
    console.log(myData)

    data.dataset = myData;
    data.x_display_name = 'day you work';
    data.x_display_name = 'how much you made';

    data.margins = {top: 20, right: 10, bottom: 0, left: 10}
    data.barClass = 'barChart';

    let myGraph = document.getElementById('myGraph')
    
    console.log(myGraph.childElementCount)
    if(myGraph.childElementCount > 0){
        myGraph.removeChild(myGraph.childNodes[0])
    }
    myGraph.append(data)

    console.log(data)
}



export default function PayInfo() {
    const classes = useStyles();


    return(
        <React.Fragment>

            <Container height="100%">


                <Grid container spacing = {3}>
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