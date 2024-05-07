import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: props.customer._links.self.href
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTraining({ ...training, [name]: value });
    };

    const addTraining = () => {
        const { date, duration, activity } = training;
        if (!date || !duration || !activity) {
            window.alert('Please fill in all required fields.');
            return;
        }
        props.saveTraining(training);
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        fullWidth
                        value={training.date}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        label="Duration"
                        type="number"
                        fullWidth
                        value={training.duration}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        label="Activity"
                        fullWidth
                        value={training.activity}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}