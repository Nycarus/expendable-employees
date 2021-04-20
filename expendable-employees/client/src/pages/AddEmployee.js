import React, { useState } from 'react';
import { Paper, Divider, Typography, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link, useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {getUserToken} from "../utils/userSession";

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        overflowX: 'hidden',
        overflowY: 'hidden',
        marginBottom: theme.spacing(5)
    },
    paperStyle: {
        padding: theme.spacing(4)
    },
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    addButton: {
        marginTop: theme.spacing(4),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

export default function AddEmployee() {
    const history = useHistory();

    const classes = useStyles();

    const [state, setState] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        postal_code: "",
        date_of_birth: "",
        password: "",
        confirmPassword: "",
        branch: "",
        position: "",
        pay_rate: ""
    })

    const handleInputChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    }

    const handleRegisterEmployee = (value) => { 
        value.preventDefault();

        if (state.password == state.confirmPassword)
        {
            axios({
                method: "post",
                url: 'http://localhost:3001/api/register/employee',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer "+ getUserToken()
                },
                data : {
                    
                        "firstname" : state.firstname,
                        "lastname": state.lastname,
                        "email" : state.email, 
                        "phone" : state.phone,
                        "address" : state.address,
                        "postal_code" : state.postal_code,
                        "date_of_birth" : state.date_of_birth,
                        "password" : state.password,
                        "pay_rate" : state.pay_rate,
                        "Position" : state.position,
                        "branch" : state.branch
                }
            }).catch(error => {
                console.log("Error:", error);
            })
        }

        history.push('/user');
    }

    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                <form id="addEmployeeForm" onSubmit = {handleRegisterEmployee}>
                <Grid container spacing={1} justify="space-evenly">
                    <Grid item xs>
                        <Paper className={classes.paperStyle}>
                            <Typography variant="h5" gutterBottom={true}>Employee Information</Typography>
                            <Grid container spacing={1} justify="space-between">
                                <Grid item xs>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="firstname"
                                        label="First Name"
                                        id="firstname"
                                        value={state.firstname}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    name="lastname"
                                    label="Last Name"
                                    id="lastname"
                                    value={state.lastname}
                                    onChange={handleInputChange}
                                    color="secondary"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} justify="space-between">
                                <Grid item xs>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="date_of_birth"
                                        label="Date of Birth"
                                        id="date_of_birth"
                                        type="date"
                                        color="secondary"
                                        value={state.date_of_birth}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}/>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="phone"
                                        label="Phone Number"
                                        id="phone"
                                        type="tel"
                                        value={state.phone}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                </Grid>
                                <Grid item xs/>
                            </Grid>
                            <Divider className={classes.dividerStyle}/>
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
                                color="secondary"/>
                            <Grid container spacing={2} justify="space-between">
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
                                        color="secondary"/>
                                </Grid>
                                <Grid item xs/>
                            </Grid>
                        </Paper>
                            <Grid container justify="flex-start">
                                <Button
                                    className={classes.addButton}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    form="addEmployeeForm">
                                    Add Employee
                                </Button>
                            </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Paper className={classes.paperStyle}>
                                    <Typography variant="h5" gutterBottom={true}>Job Information</Typography>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="branch"
                                        label="Branch Name"
                                        id="branch"
                                        value={state.branch}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                    <br/>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="position"
                                        label="Position"
                                        id="position"
                                        value={state.position}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                    <br/>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="pay_rate"
                                        label="Pay Rate"
                                        id="pay_rate"
                                        value={state.pay_rate}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={classes.paperStyle}>
                                    <Typography variant="h5" gutterBottom={true}>Employee Credentials</Typography>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="email"
                                        label="Email"
                                        id="email"
                                        value={state.email}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="password"
                                        label="Password"
                                        id="password"
                                        type="password"
                                        value={state.password}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                    <TextField
                                        fullWidth={true}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        type="password"
                                        value={state.confirmPassword}
                                        onChange={handleInputChange}
                                        color="secondary"/>
                                </Paper>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                </form>
            </main>
        </div>
    );
}