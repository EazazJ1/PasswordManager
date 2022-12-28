import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./LoginForm.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const LoginForm = ({setShowLogin, setCurrentUsername,myStorage}) => {
  const [error, setError] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Your username is Required!"),
    password: yup.string().required("Your password is Required!"),
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
      .post(`${process.env.REACT_APP_MAINSERVER}/login`, {
        username: data.username,
        password: data.password,
      })
      .then(function (response) {
        // if (response.data.message) {
        //   <p>{errors.password?.message}</p>;
        // } else {
        //   window.location.href = "/passwords";
        //   console.log(response.data);
        // }

        setCurrentUsername(response.data._id);
        myStorage.setItem("user", response.data._id);
        setShowLogin(false);
        //Add where to redirect after logging in
        window.location.href = "/main";
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="mainFormLogin">
      <div className="formTitle">
        <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <br />
        <input
          className="inputBox"
          type="text"
          placeholder="Username..."
          {...register("username")}
        />
        <p>{errors.username?.message}</p>
        <label>Password</label>
        <br />
        <input
          className="inputBox"
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <p>{errors.password?.message}</p>

        <input className="confirmButton" type="submit" value="Login" />
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <CloseIcon
        className="loginCancel"
        onClick={() => setShowLogin(false)}
      />
    </div>
    //   </div>
    // </div>
  );
};
