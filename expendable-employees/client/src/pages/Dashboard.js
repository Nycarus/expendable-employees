import React from 'react';
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";
import hoursOverview from "../components/hoursOverview";
import Title from "../components/Title";

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
            console.log(dayIndex)
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

function preventDefault(event) {
    event.preventDefault();
  }

export default function Dashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    {/* Overview of Hours */}
                    <Grid item xs={14} md={10} lg={12}>
                        <Paper className={fixedHeightPaper}>
                        {/* all the stuff here could probably be moved to another file eventually */}
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
                        </Paper>
                    </Grid>
                    {/* Annoucements */}
                    <Grid item xs={12} md={12} lg={6}>
                        <Paper className={fixedHeightPaper}>
                        <Title>Annoucements</Title>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <Grid>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Annoucement 1 Title</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button>X</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>?</Button>
                                            </TableCell>
                                        </TableRow>
                                        <Typography>Annoucer Name</Typography>
                                        <Typography>Annoucement content......</Typography>
                                        
                                    </Grid>
                                </TableRow>
                                <TableRow>
                                    <Grid>
                                    <TableRow>
                                            <TableCell>
                                                <Typography>Annoucement 2 Title</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button>X</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>?</Button>
                                            </TableCell>
                                        </TableRow>
                                        <Typography>Annoucer Name</Typography>
                                        <Typography>Annoucement content......</Typography>
                                    </Grid>
                                </TableRow>
                                <TableRow>
                                    <Grid>
                                    <TableRow>
                                            <TableCell>
                                                <Typography>Annoucement 3 Title</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button>X</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>?</Button>
                                            </TableCell>
                                        </TableRow>
                                        <Typography>Annoucer Name</Typography>
                                        <Typography>Annoucement content......</Typography> 
                                    </Grid>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </Paper>
                    </Grid>
                    
                    {/* Tasks (todo?) */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={classes.paper}>
                            <Title> Current Tasks</Title>
                            <Typography component="p" variant="h4">Task 1 Name </Typography>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                Task 1 Status 
                            </Typography>
                            <div>
                                <Link color="secondary" href="#" onClick={preventDefault}>
                                    View Task 1 Details
                                </Link>
                            </div>
                            <Typography component="p" variant="h4">Task 2 Name</Typography>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                Task 2 Status
                            </Typography>
                            <div>
                                <Link color="secondary" href="#" onClick={preventDefault}>
                                    View Task 2 Details
                                </Link>
                            </div>
                        </Paper>
                    </Grid>

                </Container>
            </main>
        </div>
    );
}