import React from "react";
// import { RegisterForm } from "../components/RegisterForm";
import "./homepage.css";
// import { useState } from "react";
// import { LoginForm } from "../components/LoginForm";

const Homepage = () => {
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  
  // const myStorage = window.localStorage;
  // const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));

  // const handleLogout = () => {
  //   setCurrentUsername(null);
  //   myStorage.removeItem("user");
  // };


  return (
    // <div className="">
    //   {currentUsername ? (
    //     <button className="button logout" onClick={handleLogout}> Log Out</button>
    //   ) : (
    //     <div className="buttons">
    //       <button className="button login" onClick={() => setShowLogin(true)}>
    //         {" "}
    //         Login
    //       </button>
    //       <button
    //         className="button register"
    //         onClick={() => setShowRegister(true)}
    //       >
    //         {" "}
    //         Register
    //       </button>
    //     </div>
    //   )}
    //   {showRegister && <RegisterForm setShowRegister={setShowRegister} />}
    //   {showLogin && (
    //     <LoginForm
    //       setShowLogin={setShowLogin}
    //       setCurrentUsername={setCurrentUsername}
    //       myStorage={myStorage}
    //     />
    //   )}
    // </div>
    <div><h1>HomePage</h1></div>
  );
};

export default Homepage;
