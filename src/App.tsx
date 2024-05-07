import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rent-car-form" element={<Rent />} />
          <Route path="adding-car-form" element={<Car />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
