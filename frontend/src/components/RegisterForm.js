import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../pages/addPassword.css";

export const RegisterForm = () => {
  const schema = yup.object().shape({
    email: yup.string().required("Your E-mail is Required!"),
    username: yup.string().required("Your username is Required!"),
    password: yup.string().required("Your password is Required!"),
    retypePassword: yup.string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios.post(`${process.env.REACT_APP_MAINSERVER}/login`, {
      email: data.email,
      username: data.username,
      password: data.password,
    })
    .then(function (response) {
      window.location.href="/"
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
    <div className="form">
      <h2>Create a new Account</h2>
      <div className="centerForm">
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>E-mail</label>
      <br/>
      <input className="inputBox" type="text" placeholder="E-mail..." {...register("email")} />
      <p>{errors.email?.message}</p>
      <label>Username</label>
      <br/>
      <input className="inputBox" type="text" placeholder="Username..." {...register("username")} />
      <p>{errors.username?.message}</p>
      <label>Password</label>
      <br/>
      <input className="inputBox" type="password" placeholder="Password..." {...register("password")} />
      <p>{errors.password?.message}</p>
      <label>Confirm Password</label>
      <br/>
      <input className="inputBox" type="password" placeholder="Password..." {...register("retypePassword")} />
      <p>{errors.retypePassword?.message}</p>
      
      <input className="confirmButton" type="submit" value="Create Account"/>
    </form>
    </div>
    </div>
    </div>
  );
};