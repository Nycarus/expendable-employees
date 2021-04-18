/*
TODO put SIGN IN button to be aligned far-right instead of centered
TODO put "Forgot Password?" to be aligned far-left
TODO put "Sign up" to be aligned far-right, but also anchored to bottom of screen
 */

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Divider, Link as MuiLink} from '@material-ui/core';
import axios from "axios";
import {setUserSession, getUserToken} from "../utils/userSession";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/Nyvq2juw4_o/1920x1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
    linkText: {
        textDecoration: 'underline'
    },
    dividerStyle: {
        margin: theme.spacing(2)
    }
}));

export default function Login() {
    const history = useHistory();

    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    }

    const handleLogin = (value) => {
        value.preventDefault();
     
        axios.post('http://localhost:3001/api/login', 
        {
            "email" : state.email, 
            "password" : state.password
        }
        ).then(response => {
            if (response.status == 200){

                setUserSession(response.data);

                history.push('/user');
            }
        }).catch(error => {
            console.log("Error:", error);
            console.log("bad password");
            
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={9} className={classes.image}/>
            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src="assets/logo_full.png" height="70px"/>
                    <Divider className={classes.dividerStyle}/>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form onSubmit = {handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            //required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            color="secondary"
                            value={state.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            //required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            color="secondary"
                            value={state.password}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            //component={Link} to="/user"
                        >
                            Login
                        </Button>
                    </form>
                    <Grid container direction="column" justify="center">
                        <Grid item>
                            <MuiLink className={classes.linkText} href="#" variant="body2" color="textPrimary">
                                Forgot password?
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" display="block">
                                Don't have an account?‏‏‎ ‎
                                <MuiLink className={classes.linkText} href="#" variant="body2" color="textPrimary">
                                    {"Sign Up"}
                                </MuiLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}