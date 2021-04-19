import React from 'react';
import {makeStyles, Container, Grid, Paper, Divider } from '@material-ui/core';
import HoursOverview from "../components/hoursOverview";
import Annoucements from "../components/Annoucements";
import EmailDashboard from "../components/EmailDashboard";


const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        overflowY: 'hidden',
        flexDirection: 'column',
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));



export default function Dashboard() {
    const classes = useStyles();
    return (
        <div>
            <main className={classes.content}>
                <Container className={classes.container} height="100%">
                    <Grid container spacing={3}>
                        <Grid item xs>
                        {/* Overview of Hours */}
                            <Paper className={classes.paper}>
                                <HoursOverview></HoursOverview>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Divider className={classes.divider}/>
                    <Grid container spacing = {3}>
                        {/* Annoucements */}
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <Annoucements></Annoucements>
                            </Paper>
                        </Grid>

                        {/* Emails */}
                        <Grid item xs>
                            <Paper className={classes.paper}>
                                <EmailDashboard></EmailDashboard>
                            </Paper>
                        </Grid>
                    </Grid>

                </Container>
            </main>
        </div>
    );
}