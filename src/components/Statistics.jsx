import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import _ from 'lodash';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function StatisticsView() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => {
                const trainings = data._embedded.trainings;

                // Ryhmittelee harjoitukset 'activity'-kentän mukaan ja laskee summat minuutteina
                const groupedData = _.groupBy(trainings, 'activity');
                const chartData = Object.keys(groupedData).map(key => ({
                    activity: key,
                    duration: _.sumBy(groupedData[key], 'duration')
                }));

                setData(chartData);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>Statistics</Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: '80vh', width: '100%' }}>
                <BarChart width={1150} height={425} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: "duration (min)", angle: -90, position: "insideLeft" }}/>
                    <Tooltip />
                    <Bar dataKey="duration" fill="#3498db" />
                </BarChart>
            </div>
        </>
    );
}