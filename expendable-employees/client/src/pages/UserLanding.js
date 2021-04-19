/*

This is the user landing page and acts as the top-level view for all user-specific pages.
This allows the title Appbar and Drawer sidebar to always be at the highest level and present on all other user pages
such as Account, Dashboard, Schedule, etc, without needing the Appbar and Drawer to be duplicated code on each page.

Also handles relative routing.

 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Route, Switch, useRouteMatch, useLocation} from "react-router-dom";
import Dashboard from "./Dashboard";
import Mail from "./Mail";
import Finances from "./Finances";
import Employees from "./Employees";
import AddEmployee from "./AddEmployee";
import Schedule from "./Schedule";
import Account from "./Account";
import Drawer from "../components/Drawer";
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

/*
Styling mainly handles Appbar and Drawer styling, making sure their sizes adjust appropriately on Drawer open and close.
 */

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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
}));

export default function UserLanding() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    const { path } = useRouteMatch();

    /*
        Gets page/path url as string
        Substrings it to get just the sub-path

        If the substring is empty
            return 'Dashboard'
        Else
            return substring with first char capitalized

        If the returned substring is "Mail"
            remove any suffixes from title
        e.g. Mail/1" turns into "Mail"
     */
    const location = useLocation();
    const title = (location.pathname).substr(6);
    const titleUpperCase = (title.length !== 0) ? title.charAt(0).toUpperCase() + title.slice(1) : 'Dashboard';
    const handleTitle = (title) => {
        if(title.includes("Mail")){
            return "Mail";
        } else {
            return title
        }
    }

    return (
        <div className={classes.root}>

            { /* "Top-Level" Appbar */ }
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>

                    { /*
                        Closed Drawer icon.
                        On click, opens drawer.
                    */}
                    <IconButton
                        edge="start"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>

                    { /* Page Title */ }
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {handleTitle(titleUpperCase)}
                    </Typography>

                </Toolbar>
            </AppBar>

            { /*
                "Top-Level" Custom Drawer
                Passes onclick events to 'Drawer.js'
            */ }
            <Drawer
                open={open}
                handleDrawerClose={handleDrawerClose}
            />


            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                { /* Routing */ }
                <Switch>
                    <Route exact path={path}>
                        <Dashboard/>
                    </Route>
                    <Route path={`${path}/account`}>
                        <Account/>
                    </Route>
                    <Route path={`${path}/dashboard`}>
                        <Dashboard/>
                    </Route>
                    <Route path={`${path}/schedule`}>
                        <Schedule/>
                    </Route>
                    <Route path={`${path}/mail`}>
                        <Mail/>
                    </Route>
                    <Route path={`${path}/finances`}>
                        <Finances/>
                    </Route>
                    <Route path={`${path}/employees`}>
                        <Employees/>
                    </Route>
                    <Route path={`${path}/addemployee`}>
                        <AddEmployee/>
                    </Route>
                </Switch>

            </main>

        </div>
    );
}