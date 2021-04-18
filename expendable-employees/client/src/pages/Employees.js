import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from "@material-ui/core";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
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
    { id: 1, lastName: 'Snow', firstName: 'Jon', pay_rate: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', pay_rate: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', pay_rate: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', pay_rate: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', pay_rate: null },
    { id: 6, lastName: 'Melisandre', firstName: null, pay_rate: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', pay_rate: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', pay_rate: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', pay_rate: 65 },
    { id: 10, lastName: 'Melisandre', firstName: null, pay_rate: 150 },
    { id: 11, lastName: 'Clifford', firstName: 'Ferrara', pay_rate: 44 },
    { id: 12, lastName: 'Frances', firstName: 'Rossini', pay_rate: 36 },
    { id: 13, lastName: 'Melisandre', firstName: null, pay_rate: 150 },
    { id: 14, lastName: 'Clifford', firstName: 'Ferrara', pay_rate: 44 },
    { id: 15, lastName: 'Frances', firstName: 'Rossini', pay_rate: 36 },
];

const useStyles = makeStyles((theme) => ({
    database: {
        height: '90%',
        margin: theme.spacing(1)
    }

}));

export default function Employees() {
    const classes = useStyles();

    return (
        <Paper className={classes.database}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={100}
                checkboxSelection
            />
        </Paper>
    );
}