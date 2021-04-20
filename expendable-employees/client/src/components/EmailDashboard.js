import React from 'react';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Grid, Paper, Table, Divider, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import {Route, Switch, useRouteMatch, useLocation} from "react-router-dom";
import Mail from './../pages/Mail'
import {Link as myLink} from "react-router-dom";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({

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

            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell width = "60%">
                            <Typography component="p" variant="h4">
                                <ListItem button component={myLink} to="/user/mail">
                                    <Link color="secondary">
                                        It's Layoff season!
                                    </Link>
                                </ListItem>
                            </Typography>
                        </TableCell>
                        <TableCell  width = "30%">
                            <Typography color="textSecondary" className={classes.depositContext}>
                                Boss man dude
                            </Typography>
                            
                            <Typography color="textSecondary" className={classes.depositContext}>
                                12:34pm
                            </Typography>                    
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell width = "60%">
                            <Typography component="p" variant="h4">
                            <ListItem button component={myLink} to="/user/mail">
                                    <Link color="secondary">
                                        Generic Email Topic
                                    </Link>
                                </ListItem>
                            </Typography>
                        </TableCell>
                        <TableCell width = "30%">
                            <Typography color="textSecondary" className={classes.depositContext}>
                                Generic Email Sender
                            </Typography>
                            <Typography color="textSecondary" className={classes.depositContext}>
                                12:34pm
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </React.Fragment>
    )
}

