import React from "react";
import rd3 from 'react-d3-library';
import {Divider, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

const RD3Component = rd3.Component;


function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    paperInfo: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    dividerStyle: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));




export default function PayInfo() {
    const classes = useStyles();
    
    return(
        <React.Fragment>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={8}>
                        <Paper>
                        {/* graph will go here */}
                        <div id='myGraph'></div>
                        </Paper>
                    </Grid>

                    <Grid item xs={2}>
                        <Paper className={classes.paperInfo}>
                            {/* will contain total money per pay period
                            and next payday date  */}
                            <Grid container direction="column">
                                <Grid items xs>
                                    <Typography variant="h5">Income</Typography>
                                    <div id='totalMoney'>$0.00</div>
                                    <Divider className={classes.dividerStyle}/>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">Hours Worked</Typography>
                                    <div id='hoursWorked'></div>
                                    <Divider className={classes.dividerStyle}/>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">Hourly Rate</Typography>
                                    <div id='hourlyRate'></div>
                                    <Divider className={classes.dividerStyle}/>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">Payday</Typography>
                                    <div id ='nextPayday'>Never </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

        </React.Fragment>
    )

}