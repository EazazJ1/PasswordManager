import { Link } from "react-router-dom";


export const Navbar = () => {
  return (
    <div>    
    <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/"}}>Homepage</Link>      
    </div>
    <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/login/new"}}>Register</Link>      
    </div>
    <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/login"}}>Login</Link>      
    </div>
    <div className="backToHomePage">
      <Link onClick={() => {window.location.href="/passwords/new"}}>Add New Password</Link>      
    </div>
   
  </div>
  );
  
};

