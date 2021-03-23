import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import {Divider, List} from "@material-ui/core";
import {mainListItems, secondaryListItems} from "../components/listitems";
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


let svg = d3.select('main')
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

const drawerWidth = 240;

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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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

export default function Finances() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Finances
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div id='table1'></div>
                <div className={classes.appBarSpacer} />
            </main>
        </div>
    );
}