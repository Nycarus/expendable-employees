import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import Title from './Title';

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

export default function Annoucements() {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Title>Annoucements</Title>
        <Table>
            <TableBody>
                <TableRow>
                    <Grid>
                        <TableRow>
                            <TableCell>
                                <Typography>Annoucement 1 Title</Typography>
                            </TableCell>
                            <TableCell>
                                <Button>X</Button>
                            </TableCell>
                            <TableCell>
                                <Button>?</Button>
                            </TableCell>
                        </TableRow>
                        <Typography>Annoucer Name</Typography>
                        <Typography>Annoucement content......</Typography>
                                    
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid>
                        <TableRow>
                            <TableCell>
                                <Typography>Annoucement 2 Title</Typography>
                            </TableCell>
                            <TableCell>
                                <Button>X</Button>
                            </TableCell>
                            <TableCell>
                                <Button>?</Button>
                            </TableCell>
                        </TableRow>
                        <Typography>Annoucer Name</Typography>
                        <Typography>Annoucement content......</Typography>
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid>
                        <TableRow>
                            <TableCell>
                                <Typography>Annoucement 3 Title</Typography>
                            </TableCell>
                            <TableCell>
                                <Button>X</Button>
                            </TableCell>
                            <TableCell>
                                <Button>?</Button>
                            </TableCell>
                        </TableRow>
                        <Typography>Annoucer Name</Typography>
                        <Typography>Annoucement content......</Typography>
                    </Grid>
                </TableRow>
            </TableBody>
        </Table>
    </React.Fragment>
  );
}