import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar";
import AddPassword from "./pages/addPassword";
import Login from "./pages/login"
import Register from "./pages/register";
import Homepage from "./pages/homepage";
import Mainpage from "./pages/Mainpage";
import { EditForm } from "./components/EditForm";

function App() {
  const check = localStorage.getItem("user");
  console.log(check);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login/new" element={<Register/>} />
        <Route path="/passwords/new" element={localStorage.getItem("user") ? <AddPassword /> : <Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/update" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
