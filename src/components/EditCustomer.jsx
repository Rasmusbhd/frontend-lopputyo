import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const updateCustomer = () => {
        const { firstname, lastname, streetaddress, postcode, city, email, phone } = customer;
        if (!firstname || !lastname || !streetaddress || !postcode || !city || !email || !phone) {
            window.alert('Please fill in all required fields.');
            return;
        }
        props.updateCustomer(customer, props.customer._links.customer.href);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                        label="Lastname"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        label="Streetaddress"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}