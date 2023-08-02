import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./RegisterForm.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const RegisterForm = ({setShowRegister}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Your E-mail is Required!"),
    username: yup.string().required("Your username is Required!"),
    password: yup.string().required("Your password is Required!"),
    retypePassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_MAINSERVER}/login/new`, {
        email: data.email,
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        setError(false);
        setSuccess(true);
        console.log(response.data);
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="mainRegisterPage">
      <div className="mainform">
        <div className="registerHeader">
          <div className="formTitle font-sans">
            <h2>Create a new Account</h2>
          </div>
        </div>        
        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
          {/* <label>E-mail</label> */}
          {/* <br /> */}
          <input
            className="inputBox"
            type="text"
            placeholder="E-mail"
            {...register("email")}
          />
          <p className="errorCheck">{errors.email?.message}</p>
          {/* <label>Username</label> */}
          {/* <br /> */}
          <input
            className="inputBox"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          <p className="errorCheck">{errors.username?.message}</p>
          {/* <label>Password</label> */}
          {/* <br /> */}
          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="errorCheck">{errors.password?.message}</p>
          {/* <label>Confirm Password</label> */}
          {/* <br /> */}
          <input
            className="inputBox"
            type="password"
            placeholder="Retype Password"
            {...register("retypePassword")}
          />
          <p className="errorCheck">{errors.retypePassword?.message}</p>

          <input className="confirmButton" type="submit" value="Create Account" />
          {success && (
            <span className="success">Successfull. You can login now!</span>
          )}
          {error && <span className="failure">Something went wrong!</span>}
        </form>
        <CloseIcon
          className="registerCancel"
          onClick={() => setShowRegister(false)}
        />
      </div>
    </div>
  );
};
