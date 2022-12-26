import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPages from "./Pages/UserPages";
import Alert from "./Components/Alert";

function App() {

  return (
    <>
    <Alert/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/user" element={<UserPages/>}/>
    </Routes>
    </>
  );
}

export default App;
