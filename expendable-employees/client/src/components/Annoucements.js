import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import Title from './Title';

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

export default function Annoucements() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Title>Annoucements</Title>




        <Grid container spacing = {1}>
            <Grid item xs={8}>
                <Typography>Annoucement 1 Title</Typography>
            </Grid>
            <Grid item xs={2}>
                <Button>X</Button>
            </Grid>
            <Grid item xs={2}>
                <Button>?</Button>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Company Branch</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Annoucement Sender</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography>Annoucement message</Typography>
            </Grid>

            <Grid item xs = {12}></Grid>
            <Grid item xs = {12}></Grid>
        </Grid>

        <Grid container spacing = {1}>
            <Grid item xs={8}>
                <Typography>Annoucement 2 Title</Typography>
            </Grid>
            <Grid item xs={2}>
                <Button>X</Button>
            </Grid>
            <Grid item xs={2}>
                <Button>?</Button>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Company Branch</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Annoucement Sender</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography>Annoucement message</Typography>
            </Grid>
            
            <Grid item xs = {12}></Grid>
            <Grid item xs = {12}></Grid>
        </Grid>
        
        <Grid container spacing = {1}>
            <Grid item xs={8}>
                <Typography>Annoucement 3 Title</Typography>
            </Grid>
            <Grid item xs={2}>
                <Button>X</Button>
            </Grid>
            <Grid item xs={2}>
                <Button>?</Button>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Company Branch</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Annoucement Sender</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography>Annoucement message</Typography>
            </Grid>
 
            <Grid item xs = {12}></Grid>           
            <Grid item xs = {12}></Grid>
        </Grid>
        
    </React.Fragment>
  );
}