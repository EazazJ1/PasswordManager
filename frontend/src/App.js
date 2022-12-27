import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import AddPassword from "./pages/addPassword";
import Login from "./pages/login"
import Register from "./pages/register";
import Homepage from "./pages/homepage";
import { useState } from "react";

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login/new" element={<Register/>} />
        <Route path="/passwords/new" element={<AddPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
