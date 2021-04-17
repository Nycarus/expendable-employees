/*
TODO add background outline to form
TODO fix form to be in actual center of page
TODO fix spacing between text fields
TODO fix Date of Birth styling; example hint is currently overlaid over field name
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({}));

export default function Register() {
    // eslint-disable-next-line
    const classes = useStyles();

    return (
        <form>
            <Typography variant="h5">
                Account Information
            </Typography>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="email"
                label="Email"
                id="email"
                type="email"
                color="secondary"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="password"
                label="Password"
                id="password"
                type="password"
                color="secondary"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="confirmpassword"
                label="Confirm Password"
                id="confirmpassword"
                type="password"
                color="secondary"/>
            <Typography variant="h5">
                Personal Information
            </Typography>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="firstname"
                label="First Name"
                id="firstname"
                color="secondary"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="lastname"
                label="Last Name"
                id="lastname"
                color="secondary"/>
            <br/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="dateofbirth"
                label="Date of Birth"
                id="dateofbirth"
                type="date"
                color="secondary"
                size="Large"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="phone"
                label="Phone Number"
                id="phone"
                type="tel"
                color="secondary"/>
            <br/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="address"
                label="Address"
                id="address"
                color="secondary"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="postalcode"
                label="Postal Code"
                id="postalcode"
                color="secondary"/>
            <Typography variant="h5">
                Job Information
            </Typography>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="companyname"
                label="Company Name"
                id="companyname"
                color="secondary"/>
            <TextField
                variant="outlined"
                margin="dense"
                required
                name="position"
                label="Position"
                id="position"
                color="secondary"/>
            <br/>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                component={Link} to="/user">
                Register
            </Button>
        </form>
    );
}