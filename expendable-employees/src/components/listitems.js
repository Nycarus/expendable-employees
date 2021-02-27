import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import {AccountCircle, CalendarToday, Inbox, PersonAdd, Storage, Today} from "@material-ui/icons";
import {Link} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/account">
            <ListItemIcon>
                <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/calendar">
            <ListItemIcon>
                <Today />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/inbox">
            <ListItemIcon>
                <Inbox />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button component={Link} to="/finances">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Finances" />
        </ListItem>
        <ListItem button component={Link} to="/employees">
            <ListItemIcon>
                <Storage />
            </ListItemIcon>
            <ListItemText primary="Employees" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button component={Link} to="/addemployee">
            <ListItemIcon>
                <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Add Employee" />
        </ListItem>
    </div>
);