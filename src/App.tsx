import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car from "./pages/Car";
import Layout from "./pages/Layout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Error from "./pages/Error";
import CarList from "./pages/CarList";
import CarInfo from "./pages/CarInfo";
import AboutUs from "./pages/AboutUs";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme, darkTheme } from "./theme";
import { CarGroupProvider } from './Context';
import { RentCarProvider } from './pages/Andrii/RentCarContext';
import { useState, useEffect } from 'react';
import { HOME, ABOUT, CARFORM, ORDERS, CARLIST, CARINFO } from './constants'
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
    }, 1500);
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
                <Route path={HOME} element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
                  <Route index element={<Home />} />
                  <Route path={ABOUT} element={<AboutUs />} />
                  <Route path={CARFORM} element={<Car />} />
                  <Route path={ORDERS} element={<Orders />} />
                  <Route path={CARLIST} element={<CarList />} />
                  <Route path={CARINFO} element={<CarInfo />} />
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