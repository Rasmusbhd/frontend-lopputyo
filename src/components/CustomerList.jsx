import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar, AppBar, Toolbar, Typography } from '@mui/material';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, []);
    // Haetaan asiakastiedot 
    const getCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    };
    // Poistetaan yksi asiakas tietokannasta
    const deleteCustomer = (params) => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setMsg("The customer was deleted successfully!");
                        setOpen(true);
                        getCustomers();
                    } else {
                        window.alert("Something went wrong with deleting.");
                    }
                })
                .catch(error => console.error(error));
        }
    };
    //Tallenetaan uusi asiakas tietokantaan
    const saveCustomer = (customer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
            .then(response => {
                if (response.ok) {
                    setMsg('The customer was saved successfully!');
                    setOpen(true);
                    getCustomers();
                } else {
                    window.alert('Something went wrong with saving.');
                }
            })
            .catch(err => console.error(err));
    };
    // Päivitetään asiakkaan tietoja tietokantaan
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (response.ok) {
                setMsg("The customer was updated successfully!")
                setOpen(true);
                getCustomers();
            } else {
                window.alert("Something goes wrong with updating.")
            }
        })
        .catch(err => console.error(err))
    }
    // Lisätään uusi harjoitus asiakkaalle
    const saveTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training),
        })
            .then(response => {
                if (response.ok) {
                    setMsg('The training was saved successfully!');
                    setOpen(true);
                    getCustomers();
                } else {
                    window.alert('Something went wrong with saving.');
                }
            })
            .catch(err => console.error(err));
    };
    // Sarakeasettelut ja mitkä tiedot näytetään taulukossa
    const columns = [
        {
            cellRenderer: (params) => <AddTraining saveTraining={saveTraining} customer={params.data} />,
        },
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            cellRenderer: (params) => (
                <EditCustomer
                    customer={params.data}
                    updateCustomer={updateCustomer}
                />
            ),
        },
        {
            cellRenderer: (params) => (
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="ag-theme-material" style={{ width: '100%', height: '1000px' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Customer List</Typography>
                </Toolbar>
            </AppBar>
            <AddCustomer saveCustomer={saveCustomer} />
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
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
    );
}