import React from "react";
import { PasswordTable } from "../components/PasswordTable";
import { useEffect, useState } from "react";

const Mainpage = ()=> {
    const [passwordList, setPasswordList] = useState(null);

    useEffect(() => {
      getPasswords();
    }, []);

    const getPasswords = () => {
      fetch(`${process.env.REACT_APP_MAINSERVER}/passwords/${localStorage.getItem("user")}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setPasswordList(result);
          },
          (error) => {
            setPasswordList(null);
          }
        );
    };

    return (<div className=''><PasswordTable  passwordList={passwordList}/></div>)
  
  }
  
export default Mainpage;