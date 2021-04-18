import React from "react";
import {makeStyles, Button, Toolbar } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

import Title from "../components/Title";


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


export default function QuitJob() {
    const classes = useStyles();

/*

Thank you for your participation at Expendable Employees Inc.

We appreciate the somewhat modest work you did here in your three days.

Unfortunately we are going to have to let you go. You've single handedly violated over 23 company rules, which I must say is the new record. I'm surprised it took us this long to get you fired to be quite honest.

Some offences include:
    1. Trying to get the secretary's number.
    2. Turning our server cluster into a torrenting service.
    3. Saying "Sorry, long day." after drinking an entire 3 litre jug of water from the water cooler like a keg stand.
    4. Selling company laptops at a pawnshop.
    5. Photocopying pictures of your butt on the fax machine.
    6. Assaulting a co-worker over fantasy football.

Thank you for your time to read this.

Don't call us.

Expendable Employees Inc.*/
    return(
        <React.Fragment>
            <Typography>Thank you for your participation at Expendable Employees Inc.</Typography><br/>
            <Typography>We appreciate the somewhat modest work you did here in your three days.</Typography>
            <Typography>Unfortunately we are going to have to let you go. You've single handedly violated over 23 company rules, which I must say is the new record. I'm surprised it took us this long to get you fired to be quite honest.</Typography><br/>
            <Typography>Some offences include:</Typography>
            <Typography>1. Trying to get the secretary's number.</Typography>
            <Typography>2. Turning our server cluster into a torrenting service.</Typography>
            <Typography>3. Saying "Sorry, long day." after drinking an entire 3 litre jug of water from the water cooler like a keg stand.</Typography>
            <Typography>4. Selling company laptops at a pawnshop.</Typography>
            <Typography>5. Photocopying pictures of your butt on the fax machine.</Typography>
            <Typography>6. Assaulting a co-worker over fantasy football.</Typography><br/>
            <Typography>Thank you for your time to read this.</Typography>
            <Typography>Don't call us.</Typography><br/>
            <Typography>Expendable Employees Inc.</Typography>
        </React.Fragment>
    )

}