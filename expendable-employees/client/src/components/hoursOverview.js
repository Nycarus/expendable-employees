/* 
This is going to hold the hoursOverview table thing 

I am putting it into a component because dealing with the entire file
is a bit of a pain

I think I know how to do this, but i'm not sure

getting this into a component seems like more of a pain than 
dealing with the larger file. 

I'm going to come back to this later
*/


import React from "react";
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

import Title from "../components/Title";

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
    {startDate: '2021-04-12T08:00', endDate: '2021-04-12T12:00', title: 'Shift'}, // 0
    {startDate: '2021-04-13T10:00', endDate: '2021-04-13T14:00', title: 'Shift'}, // 1
    {startDate: '2021-04-15T09:45', endDate: '2021-04-15T12:00', title: 'Shift'}, // 2 
    {startDate: '2021-04-17T08:00', endDate: '2021-04-17T20:00', title: 'Shift'}, // 3
    {startDate: '2021-04-18T08:00', endDate: '2021-04-18T12:00', title: 'Shift'}, // 4
    {startDate: '2021-04-19T10:00', endDate: '2021-04-19T14:00', title: 'Shift'}, // 5
    {startDate: '2021-04-21T09:45', endDate: '2021-04-21T12:00', title: 'Shift'}, // 6
    {startDate: '2021-04-22T08:00', endDate: '2021-04-22T20:00', title: 'Shift'}, // 7
];

var currDay = 4;

function setHoursTableValues(){
    //there may be a better way to go about implementing this that doesn't involve giving every table cell an ID
    //but I don't know of that better way, so we're gonna go with this for now 
    let dataCats = ['Title', 'Start', 'End', 'Total'];
    for(let i = 0; i < dataCats.length; i ++){
        let dayOffset = -2;
        for(let j = 1; j < 6; j ++){
            let dayIndex = (currDay + dayOffset)% schedulerData.length;
            if(dayIndex < 0){
                dayIndex += schedulerData.length;
            }
            let dayInfo = schedulerData[dayIndex]
            if(i === 0){
                //instead of title, maybe date would be better
                let info = dayInfo.title
                document.getElementById('dataHours'+dataCats[i]+j).innerText = info;
            } else if(i === 1){
                let info = dayInfo.startDate.slice(11)
                document.getElementById('dataHours'+dataCats[i]+j).innerText = info;
            } else if(i === 2){
                let info = dayInfo.endDate.slice(11)
                document.getElementById('dataHours'+dataCats[i]+j).innerText = info;
            } else if(i === 3){
                //this'll probably give an error
                let end = dayInfo.endDate.slice(11);
                let start = dayInfo.startDate.slice(11);
                //eh, NaN 
                let dur = end - start
                document.getElementById('dataHours'+dataCats[i]+j).innerText = dur;
            }
            dayOffset += 1;
        }
    }

}

const arrowClickLeft = () => {
    console.log(schedulerData)
    currDay -= 1;
    if(currDay < 0){
        currDay += schedulerData.length;
    }
    currDay = currDay % schedulerData.length;
    console.log('left')
    console.log('currDay: ' + currDay)
    setHoursTableValues();
}

const arrowClickRight = () => {
    currDay += 1;
    if(currDay === schedulerData.length){
        currDay = 0;
    }
    currDay = currDay % schedulerData.length;
    console.log('right')
    console.log(currDay)
    setHoursTableValues()
}
export default function HoursOverview() {
    return(
        <React.Fragment>
            <Title>Overview of Hours</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><Button onClick = {arrowClickLeft}>leftArrow</Button></TableCell>
                        <TableCell id='dataHoursTitle1'>schedulerData[currDay - 2].title</TableCell>
                        <TableCell id='dataHoursTitle2'>schedulerData[currDay - 1].title</TableCell>
                        <TableCell id='dataHoursTitle3'>schedulerData[currDay - 0].title</TableCell>
                        <TableCell id='dataHoursTitle4'>schedulerData[currDay + 1].title</TableCell>
                        <TableCell id='dataHoursTitle5'>schedulerData[currDay + 2].title</TableCell>
                        <TableCell><Button onClick = {arrowClickRight}>rightArrow</Button></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>----</TableCell>
                        <TableCell id='dataHoursStart1'>schedulerData[currDay - 2].startDate</TableCell>
                        <TableCell id='dataHoursStart2'>schedulerData[currDay - 1].startDate</TableCell>
                        <TableCell id='dataHoursStart3'>schedulerData[currDay - 0].startDate</TableCell>
                        <TableCell id='dataHoursStart4'>schedulerData[currDay + 1].startDate</TableCell>
                        <TableCell id='dataHoursStart5'>schedulerData[currDay + 2].startDate</TableCell>
                        <TableCell>----</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>----</TableCell>
                        <TableCell id='dataHoursEnd1'>schedulerData[currDay - 2].endDate</TableCell>
                        <TableCell id='dataHoursEnd2'>schedulerData[currDay - 1].endDate</TableCell>
                        <TableCell id='dataHoursEnd3'>schedulerData[currDay - 0].endDate</TableCell>
                        <TableCell id='dataHoursEnd4'>schedulerData[currDay + 1].endDate</TableCell>
                        <TableCell id='dataHoursEnd5'>schedulerData[currDay + 2].endDate</TableCell>
                        <TableCell>----</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>----</TableCell>
                        <TableCell id='dataHoursTotal1'>HowManyHours</TableCell>
                        <TableCell id='dataHoursTotal2'>HowManyHours</TableCell>
                        <TableCell id='dataHoursTotal3'>HowManyHours</TableCell>
                        <TableCell id='dataHoursTotal4'>HowManyHours</TableCell>
                        <TableCell id='dataHoursTotal5'>HowManyHours</TableCell>
                        <TableCell>----</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
        )

}
