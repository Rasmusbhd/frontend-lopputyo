import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from 'date-fns';
import { Button, Snackbar, AppBar, Toolbar, Typography } from '@mui/material';
import AddTraining from './AddTraining';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data._embedded.trainings.map(training => {
                let customerName = 'Unknown';
                
                if (training.customer) {
                    customerName = `${training.customer.firstname} ${training.customer.lastname}`;
                }
                
                return {
                    ...training,
                    date: format(new Date(training.date), 'dd.MM.yyyy HH:mm'),
                    customerName
                };
            })))
            .catch(err => console.error(err));
    };


    const deleteTraining = (params) => {
        const confirmed = window.confirm('Are you sure you want to delete this training?');
        if (confirmed) {
            fetch(params.data._links.training.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg('The training was deleted successfully!');
                        setOpen(true);
                        getTrainings();
                    } else {
                        window.alert('Something went wrong with deleting.');
                    }
                })
                .catch(error => console.error(error));
        }
    };

    const saveTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    setMsg('The training was saved successfully!');
                    setOpen(true);
                    getTrainings();
                } else {
                    window.alert('Something went wrong with saving.');
                }
            })
            .catch(err => console.error(err));
    };

    const columns = [
        { field: 'date', sortable: true, filter: true, headerName: 'Date' },
        { field: 'duration', sortable: true, filter: true, headerName: 'Duration' },
        { field: 'activity', sortable: true, filter: true, headerName: 'Activity' },
        { field: 'customerName', sortable: true, filter: true, headerName: 'Customer' },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}
                >
                    Delete
                </Button>,
        }
    ];

    return (
        <>
            <div className="ag-theme-material" style={{ width: '100%', height: '1000px' }}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='h6'>
                            Training List
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columns}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
        </>
    );
}