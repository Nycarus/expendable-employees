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
import {Paper, Divider, Container} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    image: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/faEfWCdOKIg/1920x1080)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.40)',
    },
    headerContent: {
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(20),
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
        backgroundImage: 'url(https://i.imgur.com/71wZ2FF.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    secondImage: {
        position: 'relative',
        backgroundImage: 'url(https://i.imgur.com/UjxkIpc.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    thirdImage: {
        position: 'relative',
        backgroundImage: 'url(https://i.imgur.com/K3q3psW.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    bottomInfo: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        backgroundColor: '#0f1112',
    },
    bottomInfoGrid: {
        direction: "column",
        justify: "flex-start",
        alignItems: "flex-start"
    },
    dividerStyle: {
        margin: theme.spacing(0.5)
    }
}));

export default function Homepage() {
    const classes = useStyles();

    return (
        <div>
            {/* Header = Still problem to center the title */}
            <AppBar position="static">
                <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <img src="assets/logo_full.png" height="50px"/>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-end">
                                <Button startIcon={<PersonIcon/>} color="inherit" variant="outlined" component={Link}
                                        to="/login">Login</Button>
                                <Divider className={classes.dividerStyle} orientation="vertical"/>
                                <Button color="inherit" variant="outlined" component={Link}
                                        to="/register">Register</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/* Supposedly to be Carousel, but will do this later (Will need an API and such) */}
            <Paper className={classes.image} elevation={5}>
                <div className={classes.overlay}/>
                <Container className={classes.headerContent}>
                    <Typography component="h1" variant="h3" color="inherit">
                        Welcome to the perfect managerial tool.
                    </Typography>
                    <Typography component="h1" variant="h3" color="inherit">
                        Our goal is to make your employees expendable.
                    </Typography>
                </Container>
            </Paper>

            <Typography variant="h2" color="inherit">
                Our Proud Products
            </Typography>

            {/* Content */}
            {/* First content */}
            <Paper className={classes.showcaseCards} elevation={3}>
                <Grid container spacing={10} direction="row">
                    <Grid item xs={7}>
                        <Typography variant="h4" color="inherit" gutterBottom={true}>
                            Curabitur Imperdiet Imperdiet Tincidunt
                        </Typography>
                        <Typography variant="body1" color="inherit" align="left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie erat at magna
                            accumsan, feugiat pellentesque nibh consequat. Suspendisse bibendum a odio nec tincidunt.
                            Donec fermentum, tellus eget consectetur rhoncus, est risus imperdiet mi, in mollis diam
                            purus a dolor. Sed libero arcu, egestas quis lobortis vel, porttitor id odio. Maecenas sed
                            urna sit amet ligula iaculis interdum vitae id elit. Fusce malesuada metus pharetra mauris
                            semper, facilisis ornare leo pellentesque. Aenean vel imperdiet felis, sed dignissim sem.
                            Donec nec lacus at purus mollis lobortis. Sed in ligula non massa consequat tristique.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.firstImage} item xs={5}/>
                </Grid>
            </Paper>

            {/* Second content */}
            <Paper className={classes.showcaseCards} elevation={3}>
                <Grid container spacing={10} direction="row">
                    <Grid item className={classes.secondImage} item xs={5}/>
                    <Grid item xs={7}>
                        <Typography variant="h4" color="inherit" gutterBottom={true}>
                            Integer Fermentum Ipsum Lorem
                        </Typography>
                        <Typography variant="body1" color="inherit" align="left">
                            Mauris sagittis interdum vestibulum. Sed blandit erat justo, ac feugiat lacus ornare eu.
                            Cras elementum, tortor eu interdum pellentesque, turpis justo luctus nisi, sit amet
                            elementum neque tortor sit amet neque. Suspendisse pretium massa a orci interdum, a lacinia
                            augue viverra. Quisque convallis molestie dolor, a auctor lacus ultricies vitae. Nam
                            tincidunt nunc id nulla ultricies lacinia. Aliquam eu nisl ac mi interdum lacinia vel ut
                            justo. Suspendisse efficitur nec nisl at tincidunt. Nulla facilisi.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Third content */}
            <Paper className={classes.showcaseCards} elevation={3}>
                <Grid container spacing={10} direction="row">
                    <Grid item xs={7}>
                        <Typography variant="h4" color="inherit" gutterBottom={true}>
                            Lorem Ipsum Dolor Sit Amet
                        </Typography>
                        <Typography variant="body1" color="inherit" align="left">
                            Curabitur imperdiet imperdiet tincidunt. Praesent id congue sapien. Vivamus ultrices ante
                            quis ante ultricies faucibus. Proin eget condimentum nunc, vitae dapibus massa. Ut accumsan
                            ex vitae tortor ullamcorper, rhoncus feugiat turpis laoreet. Suspendisse sed aliquet lorem,
                            non egestas lacus. Quisque interdum odio nec pharetra ultricies. Etiam eget tortor auctor,
                            ultrices dui sit amet, maximus neque. In posuere nibh ut lacus ullamcorper, id scelerisque
                            tellus condimentum. Donec in sapien odio. Etiam non arcu fermentum neque commodo
                            scelerisque. Curabitur condimentum eros aliquet, elementum ante in, pulvinar velit.
                        </Typography>
                    </Grid>
                    <Grid item className={classes.thirdImage} item xs={5}/>
                </Grid>
            </Paper>

            {/*Bottom information*/}
            <Paper className={classes.bottomInfo}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                            <img src="assets/logo_full.png" height="50px"/>
                            <Typography variant="overline" color="inherit" align="left">
                                Made by (2021) We Just Want to Pass Studio Ltd.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" color="inherit" align="right">
                            Contact Us
                        </Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">Anthony
                            Huang</Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">Aron-Seth
                            Cohen</Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">Cole
                            Mollica</Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">John
                            Nemec</Typography>
                        <Typography variant="overline" color="inherit" align="right" display="block">Kevin
                            Chandra</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
