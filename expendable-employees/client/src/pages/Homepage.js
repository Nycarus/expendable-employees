/*
TODO fix app bar in Homepage.js; set buttons to far-right, set logo & header to far-left.
TODO fix banner image text to be centered on screen instead of aligned far-left
TODO add random product gibberish below banner to make landing page more pleasing;
     things like analytics, about us info, company goals, fake reviews, etc
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Paper, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    image: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/faEfWCdOKIg/1920x1080)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    headerContent: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(25),
        },
    },
    showcaseCards: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    //At the moment image css has to be repeated for each posts. I'll try to find another way
    firstImage: {
        position: 'relative',
        backgroundImage: 'url(https://i.kym-cdn.com/entries/icons/facebook/000/035/071/awooga_awooga.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    secondImage: {
        position: 'relative',
        backgroundImage: 'url(https://i.redd.it/b50mcic9lb861.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    bottomInfo: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: '#000000',
    },
    bottomInfoGrid: {
        direction: "column",
        justify: "flex-start",
        alignItems: "flex-start"
    }
}));

export default function Homepage() {
    const classes = useStyles();

    return (
        <div>
            {/* Header = Still problem to center the title */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Expendable Employees
                    </Typography>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </Toolbar>
            </AppBar>

            {/* Supposedly to be Carousel, but will do this later (Will need an API and such) */}
            <Paper className={classes.image} elevation={5}>
                <div className={classes.overlay}/>
                <Grid container>
                    <Grid item>
                        <div className={classes.headerContent}>
                            <Typography component="h1" variant="h3" color="inherit">
                                Welcome to the perfect managerial tool.
                            </Typography>
                            <Typography component="h1" variant="h3" color="inherit">
                                Our goal is to make your employees expendable.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h2" color="inherit">
                Our proud products
            </Typography>

            {/* Content */}
            {/* First content */}
            <Paper className={classes.showcaseCards} elevation={3}>
                <Grid container spacing={10} direction="row">
                    <Grid item xs={7}>
                        <Typography variant="h4" color="inherit" gutterBottom={true}>
                            Our product just works
                        </Typography>
                        <Typography variant="body1" color="inherit" align="left">
                            *jaw drops to floor, eyes pop out of sockets accompanied by trumpets, 
                            heart beats out of chest, awooga awooga sound effect, 
                            pulls chain on train whistle that has appeared next to head as steam blows out, 
                            slams fists on table, rattling any plates, bowls or silverware, whistles loudly, 
                            fireworks shoot from top of head, pants loudly as tongue hangs out of mouth, wipes 
                            comically large bead of sweat from forehead, clears throat, straightens tie, combs hair* 
                            Ahem, you look very lovely.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.firstImage} item xs={5}/>
                </Grid>
            </Paper>

            {/* Second content */}
            <Paper className={classes.showcaseCards} elevation={3}>
                <Grid container spacing={10} direction="row">
                    <Grid item xs={7}>
                        <Typography variant="h4" color="inherit" gutterBottom={true}>
                            Jerma Minecraft Ep. 1
                        </Typography>
                        <Typography variant="body1" color="inherit" align="left">
                            Hello Ladies and Gentlemen! welcome to episode one of Jermacraft! 
                            the series where I play Minecraft, this is going to be a single player let's play, 
                            and when I say "let's play" I use that term pretty loosely because I am an idiot at this game. 
                            You're gonna see lots of fails, you're gonna see lots of triumphs, at least I'm hoping, 
                            so go grab yourself a nice hot cup of coffee, hot cup of cocoa. I got apple cider 
                            right here freshly brewed. Let me take a sip, ah that's some good cider!
                        </Typography>
                    </Grid>
                    <Grid item className={classes.secondImage} item xs={5}/>
                </Grid>
            </Paper>

            {/*Bottom information*/}
            <Paper className={classes.bottomInfo}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <Typography variant="h5" color="inherit">
                            Contact Us
                        </Typography>
                        <Divider/>
                        <Typography variant="body2" color="inherit" align="left">Name</Typography>
                        <Typography variant="body2" color="inherit" align="left">Name</Typography>
                        <Typography variant="body2" color="inherit" align="left">Name</Typography>
                        <Typography variant="body2" color="inherit" align="left">Name</Typography>
                        <Typography variant="body2" color="inherit" align="left">Name</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="inherit">
                            Made by (2021) We Just Want to Pass Studio
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}