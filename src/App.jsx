import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import Calendar from './components/Calendar'
import Statistics from './components/Statistics';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className='App'>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customerlist"}>Customers</Link>
        <Link to={"/traininglist"}>Trainings</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <Link to={"/statistics"}>Statistics</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App
