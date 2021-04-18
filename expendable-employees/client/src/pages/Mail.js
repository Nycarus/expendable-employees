import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import {makeStyles} from '@material-ui/core/styles';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import EmailItem from "../components/EmailItem";

const testReceivedArr = [
    {title: "Title Test 1", id: 0, message: "Test message 1.", is_read: false},
    {title: "Title Test 2", id: 1, message: "Test message 2.", is_read: true},
    {title: "Title Test 3", id: 2, message: "Test message 3.", is_read: false}];
const testSentArr = [
    {title: "Title Test 4", id: 7, message: "Test message 4.", is_read: false},
    {title: "Title Test 5", id: 8, message: "Test message 5.", is_read: false},
    {title: "Title Test 6", id: 9, message: "Test message 6.", is_read: false}];

const useStyles = makeStyles((theme) => ({
    composeButton: {
        margin: theme.spacing(1),
    },
    select: {
        margin: theme.spacing(1),
    },
    selectIndividual: {
        padding: "4px",
        margin: theme.spacing(1),
    },
    options: {
        padding: "4px"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            {...other}
        >
            {children}
        </div>
    );
}

export default function Mail() {
    const classes = useStyles();
    const {path} = useRouteMatch();

    const [checkedCheckboxes, setCheckedCheckboxes] = React.useState([-1]);
    const [openComposeDialog, setOpenComposeDialog] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [selAllCheck, setSelAllChecked] = React.useState(false);

    // Handler for checkbox toggle on or off
    const handleToggle = (value) => () => {

        const currentIndex = checkedCheckboxes.indexOf(value);
        const newChecked = [...checkedCheckboxes];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedCheckboxes(newChecked);
    };

    // Handler for Compose button dialog
    const handleComposeDialog = () => {
        /*
            If Dialog is open, close on clicks
            If Dialog is not open, open on clicks
         */
        if (openComposeDialog) {
            setOpenComposeDialog(false);
        } else {
            setOpenComposeDialog(true);
        }
    };

    // Handler for tab change
    const handleTabChange = (event, newTab) => {
        setSelAllChecked(false);                // Sets Select All checkbox to false
        setCheckedCheckboxes([-1]);             // Sets all email checkboxes to false
        setTab(newTab);                               // Sets to other tab
    };

    // Handler for Select All checkbox
    const handleSelectAll = (event) => {
        setSelAllChecked(event.target.checked);       // Sets Select All checkbox to True or False

        /*
            If Select All is true
                If tab index is at 0 (thus tab is at Inbox)
                    Set all checkboxes of Inbox emails to True
                Else (meaning tab index is at 1, thus tab is at Sent)
                    Set all checkboxes of Sent emails to True
            Else
                Set all checkboxes (in both tabs) to False
        */
        if (event.target.checked) {
            if (tab == 0) {
                setCheckedCheckboxes(testReceivedArr.map(x => x.id));
            } else {
                setCheckedCheckboxes(testSentArr.map(x => x.id));
            }
        } else {
            setCheckedCheckboxes([-1]);
        }

    };

    // Handler for email title text colour
    const handleTitleColor = (is_read) => {
        /*
            If email is read
                set color to grey
            Else
                set color to white
         */
        if (is_read) {
            return "textSecondary"
        } else {
            return "initial"
        }
    }

    // Handler for email title text weight
    const handleTitleWeight = (is_read) => {
        /*
            If email is read
                set weight to normal
            Else
                set weight to bold
         */
        if (is_read) {
            return "fontWeightRegular"
        } else {
            return "fontWeightBold"
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    return (
        <Switch>
            { /* General Mail Route */}
            <Route exact path={path}>
                <Grid
                    container
                    direction="column"
                >
                    { /* First Row */}
                    <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                    >
                        { /* Tabs */}
                        <Grid item>
                            <Tabs value={tab} onChange={handleTabChange} aria-label="simple tabs example">
                                <Tab label="Inbox"/>
                                <Tab label="Sent"/>
                            </Tabs>
                        </Grid>
                        { /* Compose button */}
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.composeButton}
                                startIcon={<SendIcon/>}
                                onClick={handleComposeDialog}
                            >
                                Compose
                            </Button>
                            <Dialog
                                open={openComposeDialog}
                                onClose={handleComposeDialog}
                                disableBackdropClick
                                disableEscapeKeyDown>
                                <DialogTitle>
                                    New Message
                                    {handleComposeDialog ? (
                                        <IconButton
                                            className={classes.closeButton}
                                            onClick={handleComposeDialog}>
                                            <CloseIcon/>
                                        </IconButton>
                                    ) : null
                                    }
                                </DialogTitle>
                                <DialogContent dividers>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Recipient(s):"
                                        type="email"
                                        fullWidth
                                        color="secondary"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Title:"
                                        type="text"
                                        fullWidth
                                        color="secondary"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Message:"
                                        type="text"
                                        fullWidth
                                        color="secondary"
                                        multiline
                                        rows={5}
                                        rowsMax={15}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleComposeDialog} color="secondary">
                                        Send
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>

                    { /* Second Row */}
                    <Grid
                        container
                        alignItems="center"
                        justify="flex-start"
                        className={classes.options}
                    >
                        <Tooltip title="Select All">
                            <Checkbox
                                checked={selAllCheck}
                                onChange={handleSelectAll}
                                edge="'start'"
                            />
                        </Tooltip>
                        <Tooltip title="Mark As Read">
                            <IconButton aria-label="mark as read">
                                <DoneIcon/>
                            </IconButton>
                        </Tooltip>
                    </Grid>

                    { /* Third Row */}
                    <Divider/>

                    { /* Fourth Row */}

                    { /* Inbox mail view */}
                    <TabPanel value={tab} index={0}>
                        <List disablePadding>
                            {
                                testReceivedArr.map((value) => {
                                    return (
                                        <div>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checkedCheckboxes.indexOf(value.id) !== -1}
                                                        onClick={handleToggle(value.id)}
                                                        className={classes.selectIndividual}
                                                    />
                                                </Grid>
                                                <Grid item lg md sm xl xs>
                                                    <ListItem
                                                        key={value.id}
                                                        dense
                                                        button
                                                        disableRipple
                                                        component={Link} to={{
                                                        pathname: `${path}/${value.id}`,
                                                        state: {
                                                            title: value.title,
                                                            message: value.message,
                                                        }
                                                    }}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography color={handleTitleColor(value.is_read)}>
                                                                    <Box fontWeight={handleTitleWeight(value.is_read)}>
                                                                        {value.title}
                                                                    </Box>
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                </Grid>
                                            </Grid>
                                            <Divider/>
                                        </div>
                                    );
                                })}
                        </List>
                    </TabPanel>
                    { /* Sent mail view */}
                    <TabPanel value={tab} index={1}>
                        <List disablePadding >
                            {
                                testSentArr.map((value) => {
                                    return (
                                        <div>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checkedCheckboxes.indexOf(value.id) !== -1}
                                                        onClick={handleToggle(value.id)}
                                                        className={classes.selectIndividual}
                                                    />
                                                </Grid>
                                                <Grid item lg md sm xl xs>
                                                    <ListItem
                                                        key={value.id}
                                                        dense
                                                        button
                                                        disableRipple
                                                        component={Link} to={{
                                                        pathname: `${path}/${value.id}`,
                                                        state: {
                                                            title: value.title,
                                                            message: value.message,
                                                        }
                                                    }}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                <Typography color={handleTitleColor(value.is_read)}>
                                                                    <Box fontWeight={handleTitleWeight(value.is_read)}>
                                                                        {value.title}
                                                                    </Box>
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>
                                                </Grid>
                                            </Grid>
                                            <Divider/>
                                        </div>
                                    );
                                })}
                        </List>
                    </TabPanel>
                </Grid>
            </Route>
            { /* Individual Email Route */}
            <Route path={`${path}/:id`}>
                <EmailItem/>
            </Route>
        </Switch>
    );
}

