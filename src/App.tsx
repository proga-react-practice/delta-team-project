import { BrowserRouter, Route, Routes } from "react-router-dom";
import Car  from "./pages/Mykyta/Car";
import Layout from "./pages/Layout";
import Rent from "./pages/Rent";
import Home from "./pages/Home";
import Error from "./pages/Error";

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="rent-car-form" element={<Rent />} />
          <Route path="adding-car-form" element={<Car />} />
          <Route path="*" element={<Error/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
