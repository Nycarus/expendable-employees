/*
This is going to be the part of the account page that holds the Various buttons and part underneat that has their relevant parts
Quit your Job
Edit Info
Money Information 
Change Password 


Going to do quit your job and money information first, and then editing stuff later if i can get around to it 
*/

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

const buttonOptions = [
    {buttonLabel: 'Quit Job', component:'QuitJobComponent'},
    {buttonLabel: 'Edit Info', component:'EditInfoComponent'},
    {buttonLabel: 'Payment Info', component:'PayInfoComponent'},
    {buttonLabel: 'Change Password', component:'ChangePassComponent'}
]


function loadComponent(myComponent){
    return function(){

        if(myComponent === 'QuitJobComponent'){
            console.log('job successfuly quit, happy to see you go!')
        } else if(myComponent === 'EditInfoComponent'){
            console.log("if you messed up the first time, it's your own fault")
        } else if(myComponent === 'PayInfoComponent'){
            console.log("you don't get paid, you're an intern")
        } else if(myComponent === 'ChangePassComponent'){
            console.log('fuck you no new password')
        } 

    }
}


export default function TabsAccount() {
    const classes = useStyles();


    return(

        <React.Fragment>
            

        <Toolbar>{buttonOptions.map((option) => (
            <Button onClick= {loadComponent(option.component)}>
                {option.buttonLabel}
            </Button>
        ))}</Toolbar>
            
        <div id='currAccInfo'></div>

        </React.Fragment>
    )

}