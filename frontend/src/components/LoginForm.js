import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "../pages/addPassword.css";

export const LoginForm = () => {
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
        if (response.data.message) {
          <p>{errors.password?.message}</p>;
        } else {
          window.location.href = "/passwords";
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="form">
        <h2>Login</h2>
        <div className="centerForm">
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
          </form>
        </div>
      </div>
    </div>
  );
};
