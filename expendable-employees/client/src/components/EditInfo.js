import React,{useEffect, useState} from "react";
import {makeStyles, Button, Typography, Grid, Paper, TextField, Divider } from '@material-ui/core';
import axios from "axios";
import {getUserToken} from "../utils/userSession";

const useStyles = makeStyles((theme) => ({
    categoryText: {
        marginBottom: theme.spacing(4),
    },
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    registerButton: {
        width: "10rem",
        marginTop: theme.spacing(2),
    },
    paperStyle: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}));

export default function EditInfo() {
    const classes = useStyles();

    let token = getUserToken();
    
    const [state, setState] = useState([]);

    useEffect(() => {

        async function getData(){
            if (token == null){
                
            }else{

                let response = await axios({
                    method : "get",
                    url : "http://localhost:3001/api/self/user",
                    headers : {
                        "Content-Type": "application/json",
                        "Authorization" : "Bearer "+token
                }}).catch(error => {
                    console.log(error);
                });
                setState(response.data[0])
                //console.log(response.data[0]);
                return response.data[0];
            }            
        
    }
    getData();
    },[token]);


    const handleInputChange = (event) => {
        console.log(event.target.value);
        setState((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (value) => {
        value.preventDefault();
        console.log(state);
        var arr = [];

        for (var key in state) {
            if (state.hasOwnProperty(key)) {
                arr.push( [ key, state[key] ] );
            }
        }

        axios({
            method : "post",
            url : "http://localhost:3001/api/user/update",
            headers : {
                "Content-Type": "application/json",
                "Authorization" : "Bearer "+token
            },
           data : {
               firstname: state.firstname,
               lastname: state.lastname,
               email : state.email,
               phone: state.phone,
               address : state.address,
               postal_code : state.postal_code,
               date_of_birth: state.date_of_birth
           }
        }).then(function(response){
            window.location.reload();
        }).catch(function(error){
            console.log(error);
        });
    
    }

    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={7}>
                    <Paper className={classes.paperStyle}>
                        <Typography className={classes.categoryText} variant="h5">
                            Current Personal Information
                        </Typography>
                        <form onSubmit = {handleSubmit}>
                        <Grid container justify="space-between">
                            <Grid item xs>
                                <TextField
                                fullWidth={true}
                                variant="outlined"
                                margin="dense"
                                required
                                name="firstname"
                                label="Firstname"
                                value={state.firstname}
                                id="firstname"
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }} 
                                color="secondary"/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs>
                                <TextField
                                fullWidth={true}
                                variant="outlined"
                                margin="dense"
                                required
                                name="lastname"
                                label="Last Name"
                                id="lastname"
                                onChange={handleInputChange}
                                value={state.lastname}
                                InputLabelProps={{ shrink: true }} 
                                color="secondary"/>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-between">
                            <Grid item xs>
                                <TextField
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="date_of_birth"
                                    onChange={handleInputChange}
                                    label="Date of Birth"
                                    id="date_of_birth"
                                    type="date"
                                    value = {state.date_of_birth}
                                    color="secondary"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs/>
                        </Grid>
                        <Grid container justify="space-between">
                            <Grid item xs>
                                <TextField
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="phone"
                                    value={state.phone}
                                    label="Phone Number"
                                    onChange={handleInputChange}
                                    id="phone"
                                    type="tel"
                                    InputLabelProps={{ shrink: true }} 
                                    color="secondary"/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs/>
                        </Grid>
                        <TextField
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            required
                            name="address"
                            label="Address"
                            id="address"
                            value={state.address}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }} 
                            color="secondary"/>
                        <Grid container justify="space-between">
                            <Grid item xs>
                                <TextField
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="postal_code"
                                    label="Postal Code"
                                    id="postal_code"
                                    value={state.postal_code}
                                    onChange={handleInputChange}
                                    InputLabelProps={{ shrink: true }}
                                    color="secondary"/>
                            </Grid>
                            <Grid item xs={1}/>
                            <Grid item xs/>
                        </Grid>
                        <Divider className={classes.dividerStyle}/>
                        
                        <Button
                            className={classes.registerButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                            >
                            Submit Changes 
                        </Button>
                    </form>
                    </Paper>
                </Grid>
                <Grid item xs/>
            </Grid>
        </React.Fragment>
    )

}