import CustomerList from './components/CustomerList' // Valittaa polun nimestä, koska olin muuttanut tiedoston nimeä jälkikäteen
import TrainingList from './components/TrainingList';
import Home from './components/Home';
import Calendar from './components/Calendar'
import Statistics from './components/Statistics';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customerlist" element={<CustomerList />} />
        <Route path="/traininglist" element={<TrainingList />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </>
  );
}

export default App
