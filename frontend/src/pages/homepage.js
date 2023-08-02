import React from "react";
import "./homepage.css";
import pic from "../assets/PasswordManager.png";

const Homepage = () => {

  // return (<div><h1 className="homeTitle">Password Manager</h1></div>);
  // return (<div><h1 className="homeTitle">Password Manager</h1><br/><br/><h2 className="loginMsg">Login to manage passwords.</h2></div>);
  return( 
  <div className="container">     
    <div><p className="font-sans about">A <strong>convenient</strong> and <strong>secure</strong> <br></br>place to store<br></br> all your passwords.</p></div>
    <img className="picture" src={pic} alt="Adobe Picture"/>    
  </div>   
  )

};

export default Homepage;
