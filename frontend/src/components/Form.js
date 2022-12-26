import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../pages/addPassword.css";

export const Form = () => {
  const schema = yup.object().shape({
    service: yup.string().required("The Service Name is Required!"),
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
    axios.post(`${process.env.REACT_APP_MAINSERVER}/passwords`, {
      service: data.service,
      username: data.username,
      password: data.password,
    })
    .then(function (response) {
      window.location.href="/"
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
    <div className="form">
      <h2>Add New Password</h2>
      <div className="centerForm">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Service</label>
      <br/>
      <input className="inputBox" type="text" placeholder="Service name..." {...register("service")} />
      <p>{errors.firstname?.message}</p>
      <label>Username</label>
      <br/>
      <input className="inputBox" type="text" placeholder="Username..." {...register("username")} />
      <p>{errors.lastname?.message}</p>
      <label>Password</label>
      <br/>
      <input className="inputBox" type="password" placeholder="Password..." {...register("password")} />
      <p>{errors.lastname?.message}</p>
      
      <input className="confirmButton" type="submit" value="Add Password"/>
    </form>
    </div>
    </div>
    </div>
  );
};