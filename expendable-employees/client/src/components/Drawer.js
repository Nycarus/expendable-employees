/*

Custom Drawer for overall user view

 */

import React, {useState, useEffect} from "react";
import {Drawer as MUIDrawer, List, Divider} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {mainListItems, secondaryListItems, tertiaryListItems} from "./listitems";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import axios from "axios";
import { getUserToken } from "../utils/userSession";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
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
}));



const Drawer = props => {
    const classes = useStyles();

    const [state, setState] = useState({
        isAdmin: false
    })

    useEffect(() => {
        async function checkAdmin() {
            axios({
                method: "get",
                url: 'http://localhost:3001/api/isAdmin/',
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + getUserToken()
                }
            }).then((result) => {
                setState({"isAdmin": result.data.status});
            }).catch(error => {
                console.log(error);
            });
        }
        checkAdmin();
    },[]);

    return (
        /*
            MUIDrawer - Material UI's Drawer
                Gets onclick events from parent (UserLanding.js)
                    Closes or Opens depending on user's mouse events
        */
        <MUIDrawer
            variant="permanent"
            open={props.open}
            classes={
                {
                    paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
                }
            }
        >
            { /* Shows < icon whilst drawer is open. Closers drawer on click. */ }
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            { /* Displays sidebar items as specified in 'listitems.js' */ }
            <Divider />
            <List>{mainListItems}</List>

            {state.isAdmin ? <Divider /> : null}
            {state.isAdmin ? <List>{secondaryListItems}</List> : null }
            <Divider />
            <List>{tertiaryListItems}</List>
        </MUIDrawer>
    );
};

export default Drawer;
