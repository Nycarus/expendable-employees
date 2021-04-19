/*
This is going to be the part of the account page that holds the user photo and basic information 
FirstName, LastName
Position
Blank Line
Email
Phone Number 
*/

import React, { useEffect, useState } from "react";
import {makeStyles, Grid, Paper, Typography, Divider, Avatar } from '@material-ui/core';

import {getUserToken} from "../utils/userSession";
import {useHistory} from 'react-router-dom';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    avatar:{
        width: '150px',
        height: '150px'
    },
    paperStyle: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(4),
        padding: theme.spacing(4)
    },
    dividerStyle: {
        margin: theme.spacing(1)
    }
}));


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
            <Paper className={classes.paperStyle}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        {/* this is where the pfp will be, i don't know how to do images right now  */}
                        {/*<Typography>Placeholder for pfp</Typography>*/}
                        <Avatar className={classes.avatar}>Placeholder</Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        {/* user info will be here, maybe a table */}
                        <Typography variant="h3">{data.firstname} {data.lastname} </Typography>
                        <Typography>{data.position}</Typography>
                        <Divider className={classes.dividerStyle}/>
                        <Typography>{data.email}</Typography>
                        <Typography>{data.phone}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    )

}