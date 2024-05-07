import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { toZonedTime } from 'date-fns-tz';
import { AppBar, Toolbar, Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

export default function CalendarView() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    // Haetaan kaikki harjoitukset tietokannasta
    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => response.json())
            .then(data => {
                // Muunnetaan data kalenterimuotoiseksi
                const calendarEvents = data.map(training => {
                    // Muunnetaan harjoitukset näyttämään saman ajan, kuin miten se on tietokannassa
                    const utcStart = toZonedTime(new Date(training.date), 'UTC');
                    const utcEnd = new Date(utcStart.getTime() + training.duration * 60 * 1000);
                    return {
                        title: `${training.activity} / ${training.customer?.firstname} ${training.customer?.lastname}`,
                        start: utcStart,
                        end: utcEnd,
                        allDay: false,
                    };
                });
                setEvents(calendarEvents);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Calendar</Typography>
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