/*
This is going to be the part of the account page that holds the user photo and basic information 
FirstName, LastName
Position
Blank Line
Email
Phone Number 
*/

import React from "react";
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Card, CardActionArea, CardContent, CardMedia} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

import Title from "../components/Title";

import pfp from './pfp.png'


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    image:{

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

/*
"User" : {
        "_id": "ObjectId(...)",
        "firstname" : "string",
        "lastname" : "string",
        "email" : "string",
        "phone" : "string",
        "address" : "string",
        "postal_code" : "string",
        "date_of_birth" : "string",
        "password" : "string",
        "picture" : "binary"
    }, 
const buttonOptions = [
    {buttonLabel: 'Quit Job', component:'QuitJobComponent'},
    {buttonLabel: 'Edit Info', component:'EditInfoComponent'},
    {buttonLabel: 'Payment Info', component:'PayInfoComponent'},
    {buttonLabel: 'Change Password', component:'ChangePassComponent'}
]

*/

const placeholderUser = {
    firstname: "lol",
    lastname: "idk",
    position: "placeholderBitch",
    email: "lolidk@man.com",
    phone: "123-456-7890",
    address: "3 idk street",
    postal_code:"L1N 1L1",
    date_of_birth: "0000-00-00",
    password: "password",
    picture: 'idk what to do for this'
}

export default function TopbarID() {
    const classes = useStyles();


    return(

        <React.Fragment>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={3} >
                        {/* this is where the pfp will be, i don't know how to do images right now  */}
                        <Typography>Placeholder for pfp</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        {/* user info will be here, maybe a table */}
                        <Typography>{placeholderUser.firstname} {placeholderUser.lastname} </Typography>
                        <Typography>{placeholderUser.position}</Typography><br/><br/>
                        <Typography>{placeholderUser.email}</Typography>
                        <Typography>{placeholderUser.phone}</Typography>
                        </Grid>
                    <Grid item xs={5}>
                        {/* intentionally empty */}
                    </Grid>
                </Grid>
            </Container>
            
        </React.Fragment>
    )

}