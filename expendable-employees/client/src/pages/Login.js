/*
TODO put SIGN IN button to be aligned far-right instead of centered
TODO put "Forgot Password?" to be aligned far-left
TODO put "Sign up" to be aligned far-right, but also anchored to bottom of screen
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {Link as MuiLink} from '@material-ui/core';

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
}));

export default function Login() {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={9} className={classes.image}/>
            <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">Sign in</Typography>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            //required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            color="secondary"
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
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            component={Link} to="/user"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <MuiLink href="#" variant="body2" color="textPrimary">
                                    Forgot password?
                                </MuiLink>
                            </Grid>
                            <Grid item>
                                <MuiLink href="#" variant="body2" color="textPrimary">
                                    {"Don't have an account? Sign Up"}
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}