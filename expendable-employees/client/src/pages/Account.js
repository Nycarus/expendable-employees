import React from 'react';
import {makeStyles, Button } from '@material-ui/core/';
import {Container, Grid, Paper } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import Title from "../components/Title";
import TopbarID from '../components/TopbarID';
import TabsAccount from '../components/TabsAccount';


const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '90%',
        overflowX: 'hidden',
    },
}));

export default function Account() {
    const classes = useStyles();
    return (
        <div>
            <main className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TopbarID></TopbarID>
                    </Grid>
                    <Grid item xs={12}>
                        <TabsAccount></TabsAccount>

                    </Grid>
                </Grid>
                <div className={classes.appBarSpacer} />
            </main>
        </div>
    );
}