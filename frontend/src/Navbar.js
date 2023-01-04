// import { Link } from "react-router-dom";
import "./Navbar.css"
import React from "react";
import { RegisterForm } from "./components/RegisterForm";
import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
    // window.location.href="/";
    navigate('/');
  };

  const check = localStorage.getItem("user");

  return (
  <div className="nav">    
    <div className="backToHomePage">
      <button className = "button homeButton" onClick={() => {check != null ?  navigate('/main') :  navigate('/') }}>Homepage</button> 
      {/* <button className = "button homeButton" onClick={() => {check != null ? window.location.href="/main" : window.location.href="/" }}>Homepage</button>       */}
    </div>
    {/* <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/login/new"}}>Register</Link>      
    </div>
    <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/login"}}>Login</Link>      
    </div> */}
    {/* <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/passwords/new"}}>Add New Password</Link>      
    </div>   */}
    <div className="">
      {currentUsername ? (
        <button className="button logout" onClick={handleLogout}> Log Out</button>
      ) : (
        <div className="buttons">
          <button className="button login" onClick={() => setShowLogin(true)}>
            {" "}
            Login
          </button>
          <button
            className="button register"
            onClick={() => setShowRegister(true)}
          >
            {" "}
            Register
          </button>
        </div>
      )}
      {showRegister && <RegisterForm setShowRegister={setShowRegister} />}
      {showLogin && (
        <LoginForm
          setShowLogin={setShowLogin}
          setCurrentUsername={setCurrentUsername}
          myStorage={myStorage}
        />
      )}
    </div> 
  </div>
  
  
  );
  
};

