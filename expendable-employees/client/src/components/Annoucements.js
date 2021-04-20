import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles, Button, IconButton, Box } from '@material-ui/core/';
import {Container, Grid, Paper, Divider } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}



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
                    <Typography variant="h6" align="left">Annoucement 1 Title</Typography>
                    <Typography variant="subtitle1" align="left">Company Branch</Typography>
                    <Typography variant="subtitle2" align="left">Annoucement Sender</Typography>
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
                <Typography id='ann1msg' style={{display:'none'}} align="left">Announcement message</Typography>
            </Box>
        </Paper>

        {/* Second Announcement */}
        <Paper className={classes.paperStyle}>
            <Grid container id='ann2' spacing = {1} justify="space-between">
                <Grid item xs>
                    <Typography variant="h6" align="left">Annoucement 2 Title</Typography>
                    <Typography variant="subtitle1" align="left">Company Branch</Typography>
                    <Typography variant="subtitle2" align="left">Annoucement Sender</Typography>
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
                <Typography id='ann2msg' style={{display:'none'}} align="left">Announcement message</Typography>
            </Box>
        </Paper>

        {/* Third Announcement */}
        <Paper className={classes.paperStyle}>
            <Grid container id='ann3' spacing = {1} justify="space-between">
                <Grid item xs>
                    <Typography variant="h6" align="left">Annoucement 2 Title</Typography>
                    <Typography variant="subtitle1" align="left">Company Branch</Typography>
                    <Typography variant="subtitle2" align="left">Annoucement Sender</Typography>
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
                <Typography id='ann3msg' style={{display:'none'}} align="left">Announcement message</Typography>
            </Box>
        </Paper>
        
    </React.Fragment>
  );
}