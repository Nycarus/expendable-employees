import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {
    Divider,
    Link as MuiLink
} from '@material-ui/core';
import axios from "axios";
import {setUserSession} from "../utils/userSession";
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
        password: "",
        invalidInput: false,
        reason: ""
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
            if (response.status === 200){

                setUserSession(response.data);

                history.push('/user');
            }
        }).catch(error => {
            //console.log("Error:", error);
            //console.log(error.request.status)
            let message = error.request.status === 0 ? "The Auth Server Never Sent a Response" :"You Have Entered An Invalid Email Or Password";
            
            setState({
                invalidInput: true,
                password : "",
                email: "",
                reason: message
            });

            
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={9} className={classes.image}/>
            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src="assets/logo_full.png" height="70px" alt="logo"/>
                    <Divider className={classes.dividerStyle}/>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form onSubmit = {handleLogin}>
                        <TextField
                            autoFocus="true"
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
                            error={state.invalidInput}
                            helperText={state.reason}
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
                            <Typography variant="body2" display="block">
                                Don't have an account?????????? ???
                                <MuiLink className={classes.linkText} href="/register" variant="body2" color="textPrimary">
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