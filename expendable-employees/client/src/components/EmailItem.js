import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useLocation} from "react-router-dom";
import {Box, Divider, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    boxContainer: {
        padding: theme.spacing(4),
    },
}));

export default function EmailItem() {
    let location = useLocation();

    const classes = useStyles();

    return (
        <Box className={classes.boxContainer}>
            <Grid
                container
                direction="column"
                alignItems="flex-start"
                justify="flex-start"
            >
                <Typography>
                    {location.state.title}
                </Typography>
                <Divider/>
                <Typography>
                    {location.state.message}
                </Typography>
            </Grid>
        </Box>
    );
}