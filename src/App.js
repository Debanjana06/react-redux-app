import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserPages from "./Pages/UserPages";
import Alert from "./Components/Alert";
import GlobalStyle from "./Styles/global";
import { ThemeProvider } from 'styled-components';
import { useTheme } from './Context/ThemeContext';
import ComparePage from "./Pages/ComparePage";

function App() {
  const {theme} = useTheme()
  return (
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
    <Alert/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/user" element={<UserPages/>}/>
      <Route path="/compare/:username" element={<ComparePage/>}/>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
