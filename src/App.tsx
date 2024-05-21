import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car from "./pages/Car";
import Layout from "./pages/Layout";
import Rent from "./pages/Rent";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Error from "./pages/Error";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme, darkTheme } from "./theme";
import { CarGroupProvider } from './Context';
import { RentCarProvider } from './pages/Andrii/RentCarContext';
import { useState, useEffect } from 'react';
import './App.css';
import Preloader from './pages/Preloader';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  const currentTheme = darkMode ? darkTheme : theme;

  return (
    !isLoading && (
      <RentCarProvider>
        <CarGroupProvider>
          <ThemeProvider theme={currentTheme}>
            <CssBaseline/>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                  <Route index element={<Home />} />
                  <Route path="rent-car-form" element={<Rent />} />
                  <Route path="adding-car-form" element={<Car />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="*" element={<Error />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </CarGroupProvider>
      </RentCarProvider>
    )
  );
}

export default App;
