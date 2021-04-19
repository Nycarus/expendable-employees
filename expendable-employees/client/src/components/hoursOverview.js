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
import {makeStyles, Table, TableHead, TableBody, TableCell, TableRow, Typography, Grid, IconButton} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Title from "../components/Title";

const useStyles = makeStyles((theme) => ({
    
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
                //gonna do duration 
                let dur = shiftDuration(dayInfo.startDate, dayInfo.endDate);
                let durToString = dur[0] + 'h'
                if(dur[1] < 10){
                    durToString += '0' + dur[1] + 'm'
                } else {
                    durToString += dur[1] + 'm'
                }
                document.getElementById('dataHours'+dataCats[i]+j).innerText = durToString;
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
                document.getElementById('dataHours'+dataCats[i]+j).innerText = dayIndex;
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

    let shiftDurations = []

    let dayOffset = -2;
    for(let j = 1; j < 6; j ++){
        let dayIndex = (currDay + dayOffset)% schedulerData.length;
        if(dayIndex < 0){
            dayIndex += schedulerData.length;
        }
        let dayInfo = schedulerData[dayIndex]
        let dur = shiftDuration(dayInfo.startDate, dayInfo.endDate);
        let durToString = dur[0] + 'h'
        if(dur[1] < 10){
            durToString += '0' + dur[1] + 'm'
        } else {
            durToString += dur[1] + 'm'
        }    
        shiftDurations.push(durToString)
        dayOffset += 1;
    }



    return(
        <React.Fragment>
            <Title><Typography variant="h4" gutterBottom={true}>Overview of Hours</Typography></Title>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={1}>
                    <IconButton onClick={arrowClickLeft}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell id='dataHoursTitle1'>{shiftDurations[0]}</TableCell>
                                <TableCell id='dataHoursTitle2'>{shiftDurations[1]}</TableCell>
                                <TableCell id='dataHoursTitle3'>{shiftDurations[2]}</TableCell>
                                <TableCell id='dataHoursTitle4'>{shiftDurations[3]}</TableCell>
                                <TableCell id='dataHoursTitle5'>{shiftDurations[4]}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell id='dataHoursStart1'>{schedulerData[((currDay - 2)+schedulerData.length)%schedulerData.length].startDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursStart2'>{schedulerData[((currDay - 1)+schedulerData.length)%schedulerData.length].startDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursStart3'>{schedulerData[((currDay - 0)+schedulerData.length)%schedulerData.length].startDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursStart4'>{schedulerData[((currDay + 1)+schedulerData.length)%schedulerData.length].startDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursStart5'>{schedulerData[((currDay + 2)+schedulerData.length)%schedulerData.length].startDate.slice(11)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell id='dataHoursEnd1'>{schedulerData[((currDay - 2)+schedulerData.length)%schedulerData.length].endDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursEnd2'>{schedulerData[((currDay - 1)+schedulerData.length)%schedulerData.length].endDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursEnd3'>{schedulerData[((currDay - 0)+schedulerData.length)%schedulerData.length].endDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursEnd4'>{schedulerData[((currDay + 1)+schedulerData.length)%schedulerData.length].endDate.slice(11)}</TableCell>
                                <TableCell id='dataHoursEnd5'>{schedulerData[((currDay + 2)+schedulerData.length)%schedulerData.length].endDate.slice(11)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell id='dataHoursTotal1'>{((currDay - 2)+schedulerData.length)%schedulerData.length}</TableCell>
                                <TableCell id='dataHoursTotal2'>{((currDay - 1)+schedulerData.length)%schedulerData.length}</TableCell>
                                <TableCell id='dataHoursTotal3'>{((currDay - 0)+schedulerData.length)%schedulerData.length}</TableCell>
                                <TableCell id='dataHoursTotal4'>{((currDay + 1)+schedulerData.length)%schedulerData.length}</TableCell>
                                <TableCell id='dataHoursTotal5'>{((currDay + 2)+schedulerData.length)%schedulerData.length}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={arrowClickRight}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            
        </React.Fragment>
        )

}
