import React from 'react';
import { Divider, Typography, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        marginLeft: theme.spacing(10),
        marginRight: theme.spacing(10),
        overflowX: 'hidden',
        overflowY: 'hidden',
        marginBottom: theme.spacing(5)
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
    const classes = useStyles();

    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                <Grid container spacing={10} justify="space-evenly">
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom={true}>Employee Information</Typography>
                        <Grid container spacing={2}justify="space-between">
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
                        <Grid container spacing={2} justify="space-between">
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
                            color="secondary"/>
                        <Grid container spacing={2} justify="space-between">
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
                            <Grid item xs/>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom={true}>Job Information</Typography>
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
                    </Grid>
                </Grid>
                <Grid container justify="flex-start">
                    <Button
                        className={classes.addButton}
                        type="submit"
                        variant="contained"
                        color="primary"
                        component={Link} to="#">
                        Add Employee
                    </Button>
                </Grid>
                
            </main>
        </div>
    );
}