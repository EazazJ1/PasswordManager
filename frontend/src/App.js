import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import AddPassword from "./pages/addPassword";
import Login from "./pages/login"
import RegisterForm from "./components/RegisterForm"
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/passwords" element={<AddPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
