import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { AppBar, Toolbar, Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);
    
    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => response.json())
            .then(data => {
                // Muunnetaan harjoitukset kalenteritapahtumiksi
                const calendarEvents = data.map(training => ({
                    title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`,
                    start: new Date(training.date),
                    end: new Date(new Date(training.date).getTime() + training.duration * 60 * 1000),
                    allDay: false,
                }));
                // Asetetaan harjoitukset kalenteritapahtumiksi
                setEvents(calendarEvents);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>Calendar</Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: '80vh' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['day', 'week', 'month']}
                    style={{ height: '100%' }}
                />
            </div>
        </>
    );
}