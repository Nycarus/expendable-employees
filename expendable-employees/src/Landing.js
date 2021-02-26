import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LensIcon from '@material-ui/icons/Lens';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        alignContent: "start",
    },
}));

export default function Landing() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Expendable Employees
                    </Typography>
                    <Button color="inherit"><li><Link to="/login">Login</Link></li></Button>
                    <Button color="inherit"><li><Link to="/register">Register</Link></li></Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
