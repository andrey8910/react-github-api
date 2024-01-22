
import './App.css'
import {RouterProvider} from "react-router-dom";
import React from "react";
import {router} from "./router.tsx";

function App(): React.ReactElement {
  return (
        <RouterProvider router={router} />
  )
}

export default App
