import React from"react";
import ReactDOM from"react-dom/client";
import App from"./App";
import { BrowserRouter, Route, Routes } from"react-router-dom";
import LoginPage from "./pages/login/Login";
import CustomerPage from "./pages/customer/CustomerPage";
import CarPage from "./pages/cars/CarsPage";
import ContractPage from "./pages/contracts/ContractPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="customers" element={<CustomerPage />} />
        <Route path="cars" element={<CarPage />} />
        <Route path="contracts" element={<ContractPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);