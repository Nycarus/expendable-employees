import React from 'react';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Button, Tab } from '@material-ui/core/';
import { Container, Grid, Paper } from '@material-ui/core';
import { Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';

import {AccountCircle, Inbox, PersonAdd, Storage, Today} from "@material-ui/icons";
import {Route, Switch, useRouteMatch, useLocation} from "react-router-dom";
import Title from './Title';
import Mail from './../pages/Mail'
import {Link as myLink} from "react-router-dom";

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
            <Title>Unread Recent Emails</Title>
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

