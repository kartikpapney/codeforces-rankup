import React from "react";
import Home from './Components/Home'
import Main from './Components/Main'
import {
    useRoutes,
} from "react-router-dom";

function App() {
  return <div className='App'>
    {
      useRoutes([
        { path: "/", element: <Home /> },
        { path: "/:id&:friend", element: <Main /> },
      ])
    }
  </div>
}

export default App;