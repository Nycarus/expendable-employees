import React, {useState} from 'react';
import {
    DataGrid,
    GridColumnsToolbarButton,
    GridFilterToolbarButton,
    GridDensitySelector,
    GridToolbarExport,
    GridToolbarContainer, GridToolbar, GridFooter
} from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core/styles';
import {
    Button,
    createMuiTheme, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Paper, TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import {DeleteForever, DeleteSweep, Edit, Event} from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import {MuiPickersUtilsProvider, DateTimePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

const columns = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'firstName', headerName: 'First name', width: 130},
    {field: 'lastName', headerName: 'Last name', width: 130},
    {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
    {
        field: 'pay_rate',
        headerName: 'pay_rate',
        type: 'number',
        width: 120,
    },
];

const rows = [
    {id: 1, lastName: 'Cohen', firstName: 'Aron', pay_rate: 35},
    {id: 2, lastName: 'Mollica', firstName: 'Cole', pay_rate: 42},
    {id: 3, lastName: 'Huang', firstName: 'Anthony', pay_rate: 45},
    {id: 4, lastName: 'Nemec', firstName: 'John', pay_rate: 16},
    {id: 5, lastName: 'Chandra', firstName: 'Kevin', pay_rate: 69},
    {id: 6, lastName: 'Cohen', firstName: 'Seth', pay_rate: 150},
    {id: 7, lastName: 'Huang', firstName: 'Aron', pay_rate: 44},
    {id: 8, lastName: 'Chandra', firstName: 'John', pay_rate: 36},
    {id: 9, lastName: 'Nemec', firstName: 'Anthony', pay_rate: 65},
    {id: 10, lastName: 'Chandra', firstName: 'Cole', pay_rate: 150},
    {id: 11, lastName: 'Huang', firstName: 'Kevin', pay_rate: 44},
    {id: 12, lastName: 'Mollica', firstName: 'Anthony', pay_rate: 420},
    {id: 13, lastName: 'Chandra', firstName: 'Seth', pay_rate: 150},
    {id: 14, lastName: 'Huang', firstName: 'Seth', pay_rate: 44},
    {id: 15, lastName: 'Mollica', firstName: 'John', pay_rate: 36},
];

const useStyles = makeStyles((theme) => ({
    grid: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    paper: {
        height: '90%',
    },
    root: {
        '& .MuiButton-textPrimary': {
            color: theme.palette.text.primary,
        },
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

}));

function CustomGridFooter(props) {
    const classes = useStyles();

    // Error Dialog Handler
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const handleErrorDialog = () => {
        /*
            If Dialog is open, close on clicks
            If Dialog is not open, open on clicks
         */
        if (openErrorDialog) {
            setOpenErrorDialog(false);
        } else {
            setOpenErrorDialog(true);
        }
    };

    // Handler for opening Edit Selected Employee dialog box
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const handleSuccessDialog = () => {
        /*
            If Dialog is open, close on clicks
            If Dialog is not open, open on clicks
         */
        if (openSuccessDialog) {
            setOpenSuccessDialog(false);
        } else {
            setOpenSuccessDialog(true);
        }
    };

    // Handler for editing selected employee
    const handleEditEmployee = () => {
        if (props.selectionModel.selectionModel.length == 1) {
            handleSuccessDialog();
        } else {
            handleErrorDialog();
        }
    }

    // TODO
    const handleFireSelected = () => {
        // remove props.selectionModel.selectionModel ID's from database
    }

    // TODO
    const handleFireRandom = () => {
        //pick a random id and delete
    }

    // Handler for
    const handleAddSchedule = () => {
        if (props.selectionModel.selectionModel.length >= 1) {
            handleScheduleDialog();
        }
    }

    // Handler for opening Add Schedule dialog box
    const [openScheduleDialog, setOpenScheduleDialog] = React.useState(false);
    const handleScheduleDialog = () => {
        /*
            If Dialog is open, close on clicks
            If Dialog is not open, open on clicks
         */
        if (openScheduleDialog) {
            setOpenScheduleDialog(false);
        } else {
            setOpenScheduleDialog(true);
        }
    };


    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());


    return (
        <Grid
            className={classes.grid}
            container
            direction="row"
            justify="space-between"
            alignItems="center">

            { /* Delete/Edit Button Group */}
            <Grid item>
                { /* Fire Selected Employee(s) */}
                <Tooltip title="Fire Selected Employee(s)">
                    <IconButton
                        onClick={handleFireSelected}
                    >
                        <DeleteForever/>
                    </IconButton>
                </Tooltip>
                { /* Edit Selected Employee */}
                <Tooltip title="Edit Employee">
                    <IconButton
                        onClick={handleEditEmployee}
                    >
                        <Edit/>
                    </IconButton>
                </Tooltip>
                { /* Edit Selected Employee Dialogs */}
                <Dialog
                    open={openErrorDialog}
                    onClose={handleErrorDialog}
                >
                    <DialogTitle>
                        Invalid Request.
                        {handleErrorDialog ? (
                            <IconButton
                                className={classes.closeButton}
                                onClick={handleErrorDialog}>
                                <CloseIcon/>
                            </IconButton>
                        ) : null
                        }
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography>
                            Please select only one employee.
                        </Typography>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openSuccessDialog}
                    onClose={handleSuccessDialog}
                >
                    <DialogTitle>
                        Update Employee Form:
                        {handleSuccessDialog ? (
                            <IconButton
                                className={classes.closeButton}
                                onClick={handleSuccessDialog}>
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
                            label="Employee:"
                            type="text"
                            fullWidth
                            color="secondary"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Pay Rate:"
                            type="number"
                            fullWidth
                            color="secondary"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuccessDialog} color="secondary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
                { /* Add Schedule To Employee(s) */}
                <Tooltip title="Add Schedule">
                    <IconButton
                        onClick={handleAddSchedule}
                    >
                        <Event/>
                    </IconButton>
                </Tooltip>
                { /* Add Schedule Dialog */}
                <Dialog
                    open={openScheduleDialog}
                    onClose={handleScheduleDialog}
                >
                    <DialogTitle>
                        Add To Schedule:
                        {handleScheduleDialog ? (
                            <IconButton
                                className={classes.closeButton}
                                onClick={handleScheduleDialog}>
                                <CloseIcon/>
                            </IconButton>
                        ) : null
                        }
                    </DialogTitle>
                    <DialogContent dividers>
                        <Grid container spacing="1">
                            <Grid item>
                                <Typography>
                                    Start:
                                </Typography>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker value={selectedStartDate} onChange={handleStartDateChange}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    End:
                                </Typography>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DateTimePicker value={selectedEndDate} onChange={handleEndDateChange}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleScheduleDialog} color="secondary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>

            { /* Table Paginator */}
            <GridFooter/>

            { /* Fire Random Employee */}
            <Tooltip title="Fire Random Employee">
                <IconButton
                    onClick={handleFireRandom}
                >
                    <DeleteSweep/>
                </IconButton>
            </Tooltip>

        </Grid>
    );
}

export default function Employees() {
    const classes = useStyles();

    const [selectionModel, setSelectionModel] = React.useState([])

    return (
        <Paper className={classes.paper}>
            <DataGrid
                className={classes.root}
                rows={rows}
                columns={columns}
                pageSize={15}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
                components={{
                    Toolbar: GridToolbar,
                    Footer: CustomGridFooter,
                }}
                componentsProps={{footer: {selectionModel: {selectionModel}}}}
            />

        </Paper>
    );
}