import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <div className="App">
            <center>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/customerlist">Customers</Link></li>
                    <li><Link to="/traininglist">Trainings</Link></li>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/statistics">Statistics</Link></li>
                </ul>
            </center>
        </div>
    )
}