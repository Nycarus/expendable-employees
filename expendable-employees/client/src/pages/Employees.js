import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function Employees() {
    const classes = useStyles();

    return (
        <div>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
            </main>
        </div>
    );
}