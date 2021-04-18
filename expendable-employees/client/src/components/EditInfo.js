import React from "react";
import {makeStyles, Button, Toolbar } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import {Container, Grid, Paper, TextField, Divider } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";

import Title from "./Title";


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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


export default function EditInfo() {
    const classes = useStyles();


    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={8}>
                    
                    <Typography className={classes.categoryText} variant="h5">
                        Current Personal Information
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
                                name="dateofbirth"
                                label="Date of Birth"
                                id="dateofbirth"
                                type="date"
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
                                label="Phone Number"
                                id="phone"
                                type="tel"
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
                        color="secondary"/>
                    <Grid container justify="space-between">
                        <Grid item xs>
                            <TextField
                                fullWidth={true}
                                variant="outlined"
                                margin="dense"
                                required
                                name="postalcode"
                                label="Postal Code"
                                id="postalcode"
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
                        component={Link} to="/user">
                        Submit Changes 
                    </Button>
                </Grid>
                <Grid item xs/>
            </Grid>
</React.Fragment>
    )

}