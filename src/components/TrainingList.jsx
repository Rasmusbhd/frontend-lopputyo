import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Button, Snackbar, AppBar, Toolbar, Typography } from '@mui/material';

export default function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        getTrainings();
    }, []);
    // Haetaan kaikki harjoitukset tietokannasta
    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(async data => {
                const trainingsWithCustomerName = await Promise.all(
                    data._embedded.trainings.map(async (training) => {
                        let customerName = 'Unknown'; // Alustetaan asiakasnimi
                        // Jos harjoitukselta löytyy asiakaslinkki, haetaan asiakasdata
                        if (training._links && training._links.customer) {
                            const customerResponse = await fetch(training._links.customer.href);
                            const customerData = await customerResponse.json();

                            customerName = `${customerData.firstname} ${customerData.lastname}`;
                        }
                        // Formatoidaan harjoituksen päivämäärä ja aika
                        const formattedDate = format(
                            toZonedTime(new Date(training.date), 'UTC'),
                            'dd.MM.yyyy HH:mm',
                            { timeZone: 'UTC' }
                        );
                        // Palautetaan harjoitusdata, asiakasnimi, formatoitu päivämäärä ja aika
                        return {
                            ...training,
                            date: formattedDate,
                            customerName
                        };
                    })
                );
                
                setTrainings(trainingsWithCustomerName);
            })
            .catch(err => console.error(err));
    };

    // Poistetaan yksi harjoitus tietokannasta
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
    // Sarakeasettelut ja näytetään valitut tiedot taulukossa
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