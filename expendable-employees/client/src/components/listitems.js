import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {AccountCircle, Inbox, PersonAdd, Storage, Today} from "@material-ui/icons";
import {Link} from "react-router-dom";

/*
Returns a list of buttons linked respectively to a specific path.

mainListItems:
    Returns a list of links for pages viewable to all users (employers & employees)

secondaryListItems:
    Returns a list of links for pages viewable to employers only
 */

export const mainListItems = (
    <div>

        { /* Item */ }
        <ListItem button component={Link} to="/user/account">
            { /* Icon */ }
            <ListItemIcon>
                <AccountCircle />
            </ListItemIcon>
            { /* Label */ }
            <ListItemText primary="Account" />
        </ListItem>

        <ListItem button component={Link} to="/user/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button component={Link} to="/user/schedule">
            <ListItemIcon>
                <Today />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
        </ListItem>

        <ListItem button component={Link} to="/user/mail">
            <ListItemIcon>
                <Inbox />
            </ListItemIcon>
            <ListItemText primary="Mail" />
        </ListItem>

    </div>
);

export const secondaryListItems = (
    <div>

        <ListItem button component={Link} to="/user/employees">
            <ListItemIcon>
                <Storage />
            </ListItemIcon>
            <ListItemText primary="Employees" />
        </ListItem>

        <ListItem button component={Link} to="/user/addemployee">
            <ListItemIcon>
                <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
        </ListItem>
    </div>
);

export const tertiaryListItems = (
    <div>
        <ListItem button component={Link} to="/logout">
            <ListItemIcon>
                <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
        </ListItem>
    </div>
)