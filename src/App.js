import './App.css';
import React from "react";
import Home from './Components/Home'
import Main from './Components/Main'
import {
    BrowserRouter as Router,
    useRoutes,
} from "react-router-dom";

function App() {
  return <div className='App'>
    <div className='main-container'>
      {
        useRoutes([
          { path: "/", element: <Home /> },
          { path: "/:id&:friend", element: <Main /> },
        ])
      }
    </div>
  </div>
}

export default App;