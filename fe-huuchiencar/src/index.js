import React from"react";
import ReactDOM from"react-dom/client";
import App from"./App";
import { BrowserRouter, Route, Routes } from"react-router-dom";
import LoginPage from "./pages/login/Login";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes >
        <Route index element={<App />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);