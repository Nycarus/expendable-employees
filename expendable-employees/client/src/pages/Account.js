import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

//alright all that i'm going to try and do is have the drawer
//also show up on this page, and do moving from this page to the 
//dashboard page. (I could really use a hug right now)

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function Account() {
    const classes = useStyles();
    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
            </main>
        </div>
    );
}