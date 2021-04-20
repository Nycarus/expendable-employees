import React from "react";
import {makeStyles, Button, Typography, Paper } from '@material-ui/core/';
import {Link as myLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));

export default function QuitJob() {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Paper className={classes.paperStyle}>
                <Typography variant="h5">Thank you for your participation at Expendable Employees Inc.</Typography>
                <br/>
                <Typography>We appreciate the somewhat modest work you did here in your three days.<br/>
                Unfortunately we are going to have to let you go.<br/>
                You've single handedly violated over 23 company rules, which I must say is the new record.<br/>
                I'm surprised it took us this long to get you fired to be quite honest.<br/><br/>
                Some offences include:<br/>
                1. Trying to get the secretary's number.<br/>
                2. Turning our server cluster into a torrenting service.<br/>
                3. Saying "Sorry, long day." after drinking an entire 3 litre jug of water from the water cooler like a keg stand.<br/>
                4. Selling company laptops at a pawnshop.<br/>
                5. Photocopying pictures of your butt on the fax machine.<br/>
                6. Assaulting a co-worker over fantasy football.<br/><br/>
                Thank you for your time to read this.<br/>
                DO NOT call us.<br/><br/>
                -Expendable Employees Inc.</Typography>

                <br/>

                <Button type="submit" variant="contained" color="primary" component={myLink} to="/logout">
                    I Understand 
                </Button>
                
            </Paper>
        </React.Fragment>
    )

}