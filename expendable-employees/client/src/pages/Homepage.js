/*
TODO fix app bar in Homepage.js; set buttons to far-right, set logo & header to far-left.
TODO fix banner image text to be centered on screen instead of aligned far-left
TODO add random product gibberish below banner to make landing page more pleasing;
     things like analytics, about us info, company goals, fake reviews, etc
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    image: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/faEfWCdOKIg/1920x1080)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    headerContent: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
        },
    },
}));

export default function Homepage() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Expendable Employees
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>

            <Paper className={classes.image}>
                <div className={classes.overlay}/>
                <Grid container xs={12} sm={6} md={6} lg={2}>
                    <Grid item>
                        <div className={classes.headerContent}>
                            <Typography component="h1" variant="h3" color="inherit">
                                Welcome to the perfect managerial tool.
                                Our goal is to make your employees expendable.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
