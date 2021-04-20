import React from 'react';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Grid, Paper, Table, Divider, TableBody, TableCell, TableRow, Typography, Link as MuiLink } from '@material-ui/core';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import {Route, Switch, useRouteMatch, useLocation} from "react-router-dom";
import Mail from './../pages/Mail'
import {Link as myLink} from "react-router-dom";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        backgroundColor: "#333a3d",
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
}));

function viewEmail(anEmail){
    return function(){
        console.log(anEmail)
        /*
        
        */
    }
}
export default function EmailDashboard() {
    const classes = useStyles();
    const { path } = useRouteMatch();
    return (
        <React.Fragment>
            <Route path={`${path}/mail`}><Mail/></Route>

            <Grid container spacing={2} justify="flex-start" alignItems="center">
                <Grid item>
                    <MailOutlinedIcon style={{ fontSize: 30 }}/>
                </Grid>
                <Grid item>
                <Typography variant="h5" align="left" style={{ fontSize: 25}}>
                    Unread Recent Emails
                </Typography>
                </Grid>
            </Grid>
            <Divider style={{marginTop:"5px"}}/>

            {/* First Email*/}
            <Paper className={classes.paperStyle}>
                <Grid container justify="space-between">
                    <Grid item>
                        <MuiLink component={myLink} to="/user/mail" variant="body2" color="textPrimary">
                            <Typography variant="h6" align="left">Email title name</Typography>
                        </MuiLink>
                        <Typography variant="subtitle2" align="left">Email Sender</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">12:34 PM</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Second Email*/}
            <Paper className={classes.paperStyle}>
                <Grid container justify="space-between">
                    <Grid item>
                        <MuiLink component={myLink} to="/user/mail" variant="body2" color="textPrimary">
                            <Typography variant="h6" align="left">It's Layoff season!</Typography>
                        </MuiLink>
                        <Typography variant="subtitle2" align="left">John Leighoff</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">12:34 PM</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Third Email*/}
            <Paper className={classes.paperStyle}>
                <Grid container justify="space-between">
                    <Grid item>
                        <MuiLink component={myLink} to="/user/mail" variant="body2" color="textPrimary">
                            <Typography variant="h6" align="left">Generic Email Topic</Typography>
                        </MuiLink>
                        <Typography variant="subtitle2" align="left">John Email</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption">12:34 PM</Typography>
                    </Grid>
                </Grid>
            </Paper>

            
        </React.Fragment>
    )
}

