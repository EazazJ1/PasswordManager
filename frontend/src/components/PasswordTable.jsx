import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./LoginForm.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./PasswordTable.css"
import { TextField } from "@mui/material";
import { EditForm } from "./EditForm";


//import AddPassword from "./pages/addPassword";

export const PasswordTable = ({ passwordList }) => {


  if (!passwordList) return <div>No Passwords Found</div>;


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
                <th>Userame</th>
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
            {/* </div> */}
          </table>
        </div>
      </div>
    </div>
  );
};

function deletePasswordClicked(id) {
    axios
      .delete(`${process.env.REACT_APP_MAINSERVER}/passwords/delete/${id}`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    //window.location.reload()
    //return(<Link to='/HomePage'></Link>);
  }