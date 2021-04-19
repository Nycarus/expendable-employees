import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles, Button, IconButton, Box } from '@material-ui/core/';
import {Container, Grid, Paper, Divider } from '@material-ui/core';
import {Table, TableHead, TableBody, TableCell, TableRow, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}



const useStyles = makeStyles((theme) => ({
    dividerStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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
        <Typography variant="h4" gutterBottom={true}>Announcements</Typography>

        <Grid container id='ann1' spacing = {1} justify="space-between">
            <Grid item xs>
                <Typography variant="h5" align="left">Annoucement 1 Title</Typography>
                <Typography variant="subtitle1" align="left">Company Branch</Typography>
                <Typography variant="subtitle2" align="left">Annoucement Sender</Typography>
            </Grid>
            <Grid item xs={1}>
                <IconButton onClick={removeAnnoucement('ann1')}>
                    <CloseIcon />
                </IconButton>
                <IconButton onClick={toggleVisibility('ann1msg')}>
                    <ExpandMoreIcon />
                </IconButton>
            </Grid>

        </Grid>
        <Box className={classes.infoBox}>
            <Typography id='ann1msg' style={{display:'none'}} align="left">Annoucement message</Typography>
        </Box>

        <Divider className={classes.dividerStyle}/>
        <Grid container id='ann2' spacing = {1}>
            <Grid item xs={8}>
                <Typography>Annoucement 2 Title</Typography>
            </Grid>

            <Grid item xs={2}>
                <Button onClick={toggleVisibility('ann2msg')}>?</Button>
            </Grid>
            
            <Grid item xs={2}>
                <Button onClick={removeAnnoucement('ann2')}>X</Button>
            </Grid>
            
            <Grid item xs = {6}>
                <Typography>Company Branch</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Annoucement Sender</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography id='ann2msg' style={{display:'none'}}>Annoucement message</Typography>
            </Grid>
            
            <Grid item xs = {12}></Grid>
            <Grid item xs = {12}></Grid>
        </Grid>
        <Divider className={classes.dividerStyle}/>
        <Grid container id='ann3' spacing = {1}>
            <Grid item xs={8}>
                <Typography>Annoucement 3 Title</Typography>
            </Grid>

            <Grid item xs={2}>
                <Button onClick={toggleVisibility('ann3msg')} >?</Button>
            </Grid>
            
            <Grid item xs={2}>
                <Button onClick={removeAnnoucement('ann3')}>X</Button>
            </Grid>
            
            <Grid item xs = {6}>
                <Typography>Company Branch</Typography>
            </Grid>
            <Grid item xs = {6}>
                <Typography>Annoucement Sender</Typography>
            </Grid>
            <Grid item xs = {12}>
                <Typography id='ann3msg' style={{display:'none'}}>Annoucement message</Typography>
            </Grid>
 
            <Grid item xs = {12}></Grid>           
            <Grid item xs = {12}></Grid>
        </Grid>
        
    </React.Fragment>
  );
}