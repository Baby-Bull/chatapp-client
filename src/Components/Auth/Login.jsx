import "./auth.css";
import avatar from "./profileimg.png";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, Navigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../Redux/Auth/action";
import { login } from "../../Services/auth";
import { toast } from "react-toastify";
import { setRefreshToken, setUserToken } from "../../Utils/storage";
export const LoginComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await login(regData.email, regData.password);
    const resSuccess = res?.data;
    if (res?.statusCode === 404)
      toast.error("Email doesn't exist.");
    else if (res?.status === 401)
      toast.error("Wrong password.");
    else if (res.statusCode === 200) {
      toast.success("Login successful");
      setUserToken(resSuccess?.token?.access?.token, resSuccess?.token?.access?.expires)
      setRefreshToken(resSuccess?.token?.refresh?.token)
      dispatch(authRegister(resSuccess));
    }
    else
      toast.error("Exist an error.")
  };

  if (user && user._id) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Welcome back!</h2>

        <div className="details-cont">
          <p>Email</p>
          <input name="email" onChange={handleChange} className="inputcom" />

          <p>Password</p>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="inputcom"
          />

          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}

          <Link className="auth-link" to={"/login"}>
            Forgot your password?
          </Link>
          <p className="contract">
            Need an account ?
            <Link className="auth-link" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
