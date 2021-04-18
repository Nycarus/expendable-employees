/*
TODO add background outline to form
TODO fix form to be in actual center of page
TODO fix spacing between text fields
TODO fix Date of Birth styling; example hint is currently overlaid over field name
 */

import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Divider, Paper, Container, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {setUserSession, getUserToken} from "../utils/userSession";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    categoryText: {
        marginBottom: theme.spacing(2)
    },
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    registerButton: {
        width: "10rem",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
    },
    bottomInfo: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: '#0f1112',
    },
    bottomInfoGrid: {
        direction: "column",
        justify: "flex-start",
        alignItems: "flex-start"
    },
}));

export default function Register() {
    // eslint-disable-next-line
    const classes = useStyles();

    const history = useHistory();

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
        company: "",
        branch: ""
    })

    const handleInputChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    }

    const handleRegister = (value) => { 
        value.preventDefault();

        if (state.password == state.confirmPassword)
        {
            axios.post('http://localhost:3001/api/register/company', 
            {
                user : {
                    "firstname" : state.firstname,
                    "lastname": state.lastname,
                    "email" : state.email, 
                    "phone" : state.phone,
                    "address" : state.address,
                    "postal_code" : state.postal_code,
                    "date_of_birth" : state.date_of_birth,
                    "password" : state.password
                },
                "company" : state.company,
                "branch" : state.branch
            }
            ).then(response => {
                if (response.status == 200){

                    setUserSession(response.data);

                    history.push('/login');
                }
            }).catch(error => {
                console.log("Error:", error);
            })
        }
    }

    return (
        <form onSubmit = {handleRegister}>
            <AppBar style={{marginBottom: "2rem"}} position="static">
                <Toolbar>
                    <Container>
                        <img src="assets/logo_full.png" height="50px"/>
                    </Container>
                </Toolbar>
            </AppBar>

            <Grid container>
                <Grid item xs/>
                <Grid item xs={4}>
                    <Typography className={classes.categoryText} variant="h5">
                        Account Information
                    </Typography>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="email"
                        label="Email"
                        id="email"
                        type="email"
                        color="secondary"
                        value={state.email}
                        onChange={handleInputChange}
                        />
                    <br/>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="password"
                        label="Password"
                        id="password"
                        type="password"
                        color="secondary"
                        value={state.password}
                        onChange={handleInputChange}
                        />
                    <br/>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="confirmPassword"
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        color="secondary"
                        value={state.confirmPassword}
                        onChange={handleInputChange}
                        />
                    <Divider className={classes.dividerStyle}/>
                    <Typography className={classes.categoryText} variant="h5">
                        Personal Information
                    </Typography>
                    <Grid container justify="space-between">
                        <Grid item xs>
                            <TextField
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            required
                            name="firstname"
                            label="First Name"
                            id="firstname"
                            color="secondary"
                            value={state.firstname}
                            onChange={handleInputChange}
                            />
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
                            color="secondary"
                            value={state.lastname}
                            onChange={handleInputChange}
                            />
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
                                label="Date of Birth"
                                id="date_of_birth"
                                type="date"
                                color="secondary"
                                value={state.date_of_birth}
                                onChange={handleInputChange}
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
                                label="Phone Number"
                                id="phone"
                                type="tel"
                                color="secondary"
                                value={state.phone}
                                onChange={handleInputChange}
                                />
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
                        color="secondary"
                        value={state.address}
                        onChange={handleInputChange}
                        />
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
                                color="secondary"
                                value={state.postal_code}
                                onChange={handleInputChange}
                                />
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs/>
                    </Grid>
                    <Divider className={classes.dividerStyle}/>
                    <Typography className={classes.categoryText} variant="h5">
                        Job Information
                    </Typography>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="company"
                        label="Company Name"
                        id="company"
                        color="secondary"
                        value={state.company}
                        onChange={handleInputChange}
                        />
                    <br/>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="branch"
                        label="Branch"
                        id="branch"
                        color="secondary"
                        value={state.branch}
                        onChange={handleInputChange}
                        />
                    <br/>
                    <Button
                        className={classes.registerButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        //component={Link} to="/user"
                        >
                        Register
                    </Button>
                </Grid>
                <Grid item xs/>
            </Grid>

            {/*Bottom information*/}
            <Paper className={classes.bottomInfo}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                            <img src="assets/logo_full.png" height="50px"/>
                            <Typography variant="overline" color="inherit" align="left">
                                Made by (2021) We Just Want to Pass Studio Ltd.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" color="inherit" align="right">
                            Contact Us
                        </Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">
                            Anthony Huang<br/>
                            Aron-Seth Cohen<br/>
                            Cole Mollica<br/>
                            John Nemec<br/>
                            Kevin Chandra<br/>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}