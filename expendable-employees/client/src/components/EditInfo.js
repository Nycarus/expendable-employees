import React from "react";
import {makeStyles, Button, Typography, Grid, Paper, TextField, Divider } from '@material-ui/core';
import {Link} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    categoryText: {
        marginBottom: theme.spacing(4),
    },
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    registerButton: {
        width: "10rem",
        marginTop: theme.spacing(2),
    },
    paperStyle: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8)
    }
}));

export default function EditInfo() {
    const classes = useStyles();

    return(
        <React.Fragment>
            <Grid container>
                <Grid item xs/>
                <Grid item xs={7}>
                    <Paper className={classes.paperStyle}>
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
                    </Paper>
                </Grid>
                <Grid item xs/>
            </Grid>
        </React.Fragment>
    )

}