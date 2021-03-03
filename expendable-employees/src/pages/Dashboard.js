import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Drawer, Container, Grid, Paper, AppBar, Toolbar,  IconButton } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import {Divider, List} from "@material-ui/core";
import {mainListItems, secondaryListItems} from "../components/listitems";
import Title from "../components/Title";
import { SpaceBar } from '@material-ui/icons';


const drawerWidth = 240;

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



export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {/*aite let's fuck some shit up */}
                <Container className={classes.container}>
                    {/* Overview of Hours */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                        {/* all the stuff here could probably be moved to another file eventually */}
                            <Title>Overview of Hours</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>leftArrow</TableCell>
                                        <TableCell>CurrDay - 2</TableCell>
                                        <TableCell>CurrDay - 1</TableCell>
                                        <TableCell>CurrDay</TableCell>
                                        <TableCell>CurrDay + 1</TableCell>
                                        <TableCell>CurrDay + 2</TableCell>
                                        <TableCell>rightArrow</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>----</TableCell>
                                        <TableCell>StartTime</TableCell>
                                        <TableCell>StartTime</TableCell>
                                        <TableCell>StartTime</TableCell>
                                        <TableCell>StartTime</TableCell>
                                        <TableCell>StartTime</TableCell>
                                        <TableCell>----</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>----</TableCell>
                                        <TableCell>EndTime</TableCell>
                                        <TableCell>EndTime</TableCell>
                                        <TableCell>EndTime</TableCell>
                                        <TableCell>EndTime</TableCell>
                                        <TableCell>EndTime</TableCell>
                                        <TableCell>----</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>----</TableCell>
                                        <TableCell>HowManyHours</TableCell>
                                        <TableCell>HowManyHours</TableCell>
                                        <TableCell>HowManyHours</TableCell>
                                        <TableCell>HowManyHours</TableCell>
                                        <TableCell>HowManyHours</TableCell>
                                        <TableCell>----</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    {/* Annoucements */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            
                        </Paper>
                    </Grid>
                    
                    {/* Tasks (todo?) */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                        </Paper>
                    </Grid>

                </Container>
            </main>
        </div>
    );
}