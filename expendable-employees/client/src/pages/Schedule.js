import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import {Box, Container} from "@material-ui/core";

const schedulerData = [
    {startDate: '2021-04-16T07:45', endDate: '2021-04-16T18:00', title: 'Shift'},
];

const useStyles = makeStyles((theme) => ({
    boxContainer: {
        padding: theme.spacing(4),
    },
    todayCell: {
        backgroundColor: fade(theme.palette.primary.light, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.primary.light, 0.07),
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.light, 0.09),
        },
    },
    today: {
        backgroundColor: fade(theme.palette.primary.light, 0.05),
    },
}));

// Highlights current day cells/rows
const TimeTableCell = (props) => {
    const classes = useStyles();
    const {startDate} = props;
    const date = new Date(startDate);

    if (date.getDate() === new Date().getDate()) {
        return <WeekView.TimeTableCell {...props} className={classes.todayCell}/>;
    }
    return <WeekView.TimeTableCell {...props} />;
};

// Highlights current day header
const DayScaleCell = (props) => {
    const classes = useStyles();
    const {startDate, today} = props;

    if (today) {
        return <WeekView.DayScaleCell {...props} className={classes.today}/>;
    }
    return <WeekView.DayScaleCell {...props} />;
};

export default function Schedule() {
    const currentDate = new Date();
    const classes = useStyles();

    return (
        <Box className={classes.boxContainer}>
            <Paper>
                <Scheduler
                    data={schedulerData}
                    height={700}
                >

                    <ViewState
                        defaultCurrentDate={currentDate}
                    />
                    <WeekView
                        startDayHour={0}
                        endDayHour={24}
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                    />
                    <Toolbar/>
                    <DateNavigator/>
                    <TodayButton/>
                    <Appointments/>
                    <AppointmentTooltip />
                </Scheduler>
            </Paper>
        </Box>
    );
}