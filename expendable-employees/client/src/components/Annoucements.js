import React from 'react';
import {makeStyles, Grid, Paper, Divider, IconButton, Box, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';

const useStyles = makeStyles((theme) => ({
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paperStyle: {
        backgroundColor: "#333a3d",
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1)
    },
    infoBox: {
        backgroundColor: "#5E5E5E",
    },
}));

function removeAnnoucement(annouce){
    return function(){
        let annoucement = document.getElementById(annouce)

        annoucement.style.display = 'none'

    }
}

function toggleVisibility(annouce){
    return function(){
        let annoucement = document.getElementById(annouce);

        if(annoucement.style.display === 'none'){
            annoucement.style.display = 'block'
        } else if (annoucement.style.display === 'block') {
            annoucement.style.display = 'none'
        }

    }
}
export default function Annoucements() {
    const classes = useStyles();
    return (
        <React.Fragment>
        <Grid container spacing={2} justify="flex-start" alignItems="center">
            <Grid item>
                <AnnouncementOutlinedIcon style={{ fontSize: 30 }}/>
            </Grid>
            <Grid item>
            <Typography variant="h5" align="left" style={{ fontSize: 25}}>
                Announcements
            </Typography>
            </Grid>
        </Grid>
        <Divider style={{marginTop:"5px"}}/>

        {/* First Announcement */}
        <Paper className={classes.paperStyle}>
            <Grid container id='ann1' spacing = {1} justify="space-between">
                <Grid item xs>
                    <Typography variant="h6" align="left">Harassment at Tech division</Typography>
                    <Typography variant="subtitle1" align="left">Human Resources of Ouimessalot.Ltd</Typography>
                    <Typography variant="subtitle2" align="left">Max Management</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={removeAnnoucement('ann1')}>
                        <CloseIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                    <IconButton onClick={toggleVisibility('ann1msg')}>
                        <ExpandMoreIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Box>
                <Typography id='ann1msg' style={{display:'none'}} align="left">
                    To Jim Pickens in the tech division, please stop harassing your workmate.
                </Typography>
            </Box>
        </Paper>

        {/* Second Announcement */}
        <Paper className={classes.paperStyle}>
            <Grid container id='ann2' spacing = {1} justify="space-between">
                <Grid item xs>
                    <Typography variant="h6" align="left">CEO Salary Increased</Typography>
                    <Typography variant="subtitle1" align="left">Financial Branch of Ouimessalot.Ltd</Typography>
                    <Typography variant="subtitle2" align="left">Mike Scam</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={removeAnnoucement('ann2')}>
                        <CloseIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                    <IconButton onClick={toggleVisibility('ann2msg')}>
                        <ExpandMoreIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Box>
                <Typography id='ann2msg' style={{display:'none'}} align="left">
                    With the increase of our financial income, our CEO income has been raised
                </Typography>
            </Box>
        </Paper>

        {/* Third Announcement */}
        <Paper className={classes.paperStyle}>
            <Grid container id='ann3' spacing = {1} justify="space-between">
                <Grid item xs>
                    <Typography variant="h6" align="left">Massive Lay-off News</Typography>
                    <Typography variant="subtitle1" align="left">Financial Branch of Ouimessalot.Ltd</Typography>
                    <Typography variant="subtitle2" align="left">John Leighoff</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={removeAnnoucement('ann3')}>
                        <CloseIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                    <IconButton onClick={toggleVisibility('ann3msg')}>
                        <ExpandMoreIcon style={{ fontSize: 20 }}/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
            <Box>
                <Typography id='ann3msg' style={{display:'none'}} align="left">
                    Ya'll getting fired. Please take all your belongings with you
                </Typography>
            </Box>
        </Paper>
        
    </React.Fragment>
  );
}