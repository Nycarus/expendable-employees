/*
TODO onClick Compose button, open up pop out send email form
TODO onSelect Inbox/Sent switch views to emails from users to emails to users
TODO onClick Delete button, delete any emails from 'checked' list
TODO onClick Done button, mark any emails from 'checked' list as read
TODO query calls map to object
 */

import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {makeStyles} from '@material-ui/core/styles';
import {
    Box,
    Button, Checkbox, Divider,
    FormControl,
    FormHelperText,
    Grid, IconButton,
    InputLabel, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,
    MenuItem,
    NativeSelect,
    Paper,
    Select
} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

const testArr = [{title: "Title Test 1", id: 0}, {title: "Title Test 2", id: 1}, {title: "Title Test 3", id: 2}];

const useStyles = makeStyles((theme) => ({
    composeButton: {
        margin: theme.spacing(1),

    },
    select: {
        margin: theme.spacing(1),
    },
    options: {
        padding: "4px"
    },
}));

export default function Inbox() {
    const classes = useStyles();

    const [val, setVal] = React.useState(1);

    const handleChange = (event) => {
        setVal(event.target.value);
    };

    const [selAllCheck, setSelAllChecked] = React.useState(false);

    const handleSelectAll = (event) => {
        setSelAllChecked(event.target.checked);

        if (event.target.checked) {
            setChecked([0, 1, 2, 3]);
        } else {
            setChecked([-1]);
        }

    };

    const [checked, setChecked] = React.useState([-1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Grid
            container
            direction="column"
        >
            <Grid
                container
                alignItems="center"
                justify="flex-start"
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.composeButton}
                        startIcon={<SendIcon/>}
                    >
                        Compose
                    </Button>
                </Grid>
                <Grid item>
                    <FormControl className={classes.form}>
                        <Select
                            value={val}
                            onChange={handleChange}
                            displayEmpty
                            className={classes.select}
                        >
                            <MenuItem value={1}>Inbox</MenuItem>
                            <MenuItem value={2}>Sent</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                justify="flex-start"
                className={classes.options}
            >
                <Checkbox
                    checked={selAllCheck}
                    onChange={handleSelectAll}
                    edge="'start'"
                />
                <IconButton aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
                <IconButton aria-label="mark as read">
                    <DoneIcon/>
                </IconButton>
            </Grid>
            <Divider/>
            <List>
                {
                    testArr.map((value) => {
                        return (
                            <div>
                                <ListItem
                                    key={value.title}
                                    dense
                                    button
                                    disableRipple
                                    onClick={handleToggle(value.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={value.title}/>
                                </ListItem>
                                <Divider/>
                            </div>
                        );
                    })
                }
            </List>
        </Grid>
    );
}

