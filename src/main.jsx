import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomerList from './components/CustomerList.jsx';
import TrainingList from './components/TrainingList.jsx';
import Home from './components/Home.jsx';
import Calendar from './components/Calendar.jsx'
import Statistics from './components/Statistics.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customerlist",
        element: <CustomerList />,
      },
      {
        path: "traininglist",
        element: <TrainingList />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
