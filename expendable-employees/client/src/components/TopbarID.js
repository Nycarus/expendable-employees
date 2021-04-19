/*
This is going to be the part of the account page that holds the user photo and basic information 
FirstName, LastName
Position
Blank Line
Email
Phone Number 
*/

import React, { useEffect, useState } from "react";
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Card, CardActionArea, CardContent, CardMedia} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

import Title from "../components/Title";

import pfp from './pfp.png'

import {getUserToken} from "../utils/userSession";
import {useHistory} from 'react-router-dom';
import axios from "axios";

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



let placeholderUser = {
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

*/

export default function TopbarID() {
    const history = useHistory();
    const classes = useStyles();
    const [data, setData] = useState([]);

    let token = getUserToken();


        useEffect(() => {

        async function getData(){
            if (token == null){
                history.push('/login');
            }else{

            let response = await axios({
                method : "get",
                url : "http://localhost:3001/api/self/user",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+token
            }}).catch(error => {
                console.log(error);
                history.push('/login');
            });
            setData(response.data[0])
            return response.data[0];
            }            
        
    }
    getData();
    },[token]);
    console.log(data)
    return(
        <React.Fragment>
            <Container>
                <Grid container spacing={3}>
               
                    <Grid item xs={6}>
                        {/* user info will be here, maybe a table */}
                        <Typography>{data.firstname} {data.lastname} </Typography>
                        <Typography>{data.position}</Typography><br/><br/>
                        <Typography>{data.email}</Typography>
                        <Typography>{data.phone}</Typography>
                        </Grid>
                    <Grid item xs={3}>
                        {/* intentionally empty */}
                    </Grid>
                </Grid>
            </Container>
            
        </React.Fragment>
    )

}