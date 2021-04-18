import React from "react";
import rd3 from 'react-d3-library';
import {makeStyles, Button, Toolbar } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import {Link} from '@material-ui/core';
import clsx from "clsx";
import * as d3 from 'd3'; 
import Title from "../components/Title";

const RD3Component = rd3.Component;


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




export default function PayInfo() {
    const classes = useStyles();
    


    return(
        <React.Fragment>

            <Container height="100%">


                <Grid container spacing = {3} >
                    <Grid item xs>
                        
                        
                        {/* graph will go here */}
                        <div id='myGraph'></div>
                    </Grid>

                    <Grid item xs>
                        {/* will contain total money per pay period
                        and next payday date  */}
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <Title>Total</Title>
                                </TableRow>
                                <TableRow>
                                    <Title ><div id='totalMoney'>$0.00</div></Title>
                                </TableRow>
                                <TableRow>
                                    <Title>Hours Worked</Title>
                                </TableRow>
                                <TableRow>
                                    <Title><div id='hoursWorked'></div></Title>
                                </TableRow>
                                
                                <TableRow>
                                    <Title>Houry Rate</Title>
                                </TableRow>

                                <TableRow>
                                    <Title><div id='hourlyRate'></div></Title>
                                </TableRow>

                                <TableRow>
                                    <Title>Payday</Title>
                                </TableRow>
                                <TableRow>
                                    <Title ><div id ='nextPayday'>Never </div></Title>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </Grid>

                </Grid>
            </Container>

        </React.Fragment>
    )

}