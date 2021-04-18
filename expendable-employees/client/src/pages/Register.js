/*
TODO add background outline to form
TODO fix form to be in actual center of page
TODO fix spacing between text fields
TODO fix Date of Birth styling; example hint is currently overlaid over field name
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Divider, Paper, Container, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

    return (
        <form>
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
                        color="secondary"/>
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
                        color="secondary"/>
                    <br/>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="confirmpassword"
                        label="Confirm Password"
                        id="confirmpassword"
                        type="password"
                        color="secondary"/>
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
                    <Typography className={classes.categoryText} variant="h5">
                        Job Information
                    </Typography>
                    <TextField
                        fullWidth={true}
                        variant="outlined"
                        margin="dense"
                        required
                        name="companyname"
                        label="Company Name"
                        id="companyname"
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
                        color="secondary"/>
                    <br/>
                    <Button
                        className={classes.registerButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        component={Link} to="/user">
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