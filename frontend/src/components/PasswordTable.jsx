import React from "react";
import axios from "axios";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import "./PasswordTable.css"
import { useEffect, useState } from "react";

export const PasswordTable = () => {

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


  const navigate = useNavigate();

  function deletePasswordClicked(id) {
    axios
      .delete(`${process.env.REACT_APP_MAINSERVER}/passwords/delete/${id}`)
      .then(function (response) {
        getPasswords();
        // navigate(0);
        console.log(response);
       
        // window.location.reload(true);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  if (!passwordList) return (<div>No Passwords Found</div>);


  return (
    <div className="page">
      <div className="PasswordListTitle">
        <h2 className="tableTitle">Password List</h2>
        <div className="addPassword">
          <Link to="/passwords/new">
            <button type="button">Add New Password</button>
          </Link>
        </div>
      </div>
      <div className="App">
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Username</th>
                <th>Password</th>
                <th>Last Updated</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {/* <div className="tableBody"> */}
            <tbody>
              {passwordList.map((password) => (
                <tr key={password._id}>
                  <td>{password.service}</td>
                  <td>{password.username}</td>
                  <td>{password.password}</td>
                  <td>{password.lastUpdated}</td>
                  <td>
                    <Link
                      to="/update"
                      state={{ id: password._id, username: password.username }}
                    >
                      {" "}
                      <button type="button" className="editBtn" >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="deleteBtn"
                      onClick={() =>
                        deletePasswordClicked(password._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

