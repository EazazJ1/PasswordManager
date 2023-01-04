import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import "./LoginForm.css";
import { useLocation, useNavigate } from "react-router-dom";

export const EditForm = () => {
  const location = useLocation();
  const { id, username } = location.state;
  const navigate = useNavigate();
  
  const schema = yup.object().shape({
    password: yup.string().required("New password is Required!"),
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
      .patch(`${process.env.REACT_APP_MAINSERVER}/passwords/update`, {
        _id: id,
        username: username,
        password: data.password,
      })
      .then(function (response) {
        //Add where to redirect after logging in
        // window.location.href = "/main";
        navigate('/main');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="mainFormLogin">
      <div className="formTitle">
        <h2>Update Password</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>New Password</label>
        <br />
        <input
          className="inputBox"
          type="text"
          placeholder="New Password..."
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <label>Retype Password</label>
        <br />
        <input
          className="inputBox"
          type="password"
          placeholder="Retype Password..."
          {...register("retypePassword")}
        />
        <p>{errors.retypePassword?.message}</p>

        <input className="confirmButton" type="submit" value="Update Password" />
      </form>
     
    </div>
    //   </div>
    // </div>
  );
};
