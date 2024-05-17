import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car  from "./pages/Car";
import Layout from "./pages/Layout";
import Rent from "./pages/Rent";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { CssBaseline, ThemeProvider} from "@mui/material";
import { theme, darkTheme } from "./theme";

import { useState } from 'react';

import './App.css';



function App() {
  const [darkMode, setDarkMode] = useState(false);

const toggleDarkMode = () => {
  setDarkMode(!darkMode);
};

const currentTheme = darkMode ? darkTheme : theme;

  return (
    <ThemeProvider theme={currentTheme}>
    <CssBaseline/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} >
          <Route index element={<Home />} />
          <Route path="rent-car-form" element={<Rent />} />
          <Route path="adding-car-form" element={<Car />} />
          <Route path="*" element={<Error/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
