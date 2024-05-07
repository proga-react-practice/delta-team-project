import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car  from "./pages/Mykyta/Car";
import Layout from "./pages/Layout";
import Rent from "./pages/Rent";
import Home from "./pages/Home";

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />} />
          <Route path='home' element={<Home />} />
          <Route path="rent-car-form" element={<Rent />} />
          <Route path="adding-car-form" element={<Car />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
