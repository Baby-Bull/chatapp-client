import "./auth.css";
import avatar from "./profileimg.png";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Navigate, redirect } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, uploadPic } from "../Redux/Auth/action";
import { useNavigate } from "react-router-dom";
import { register } from "../../Services/auth";
export const RegisterComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [regData, setRegData] = useState({
    avatar: avatar,
    isAdmin: false,
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };
  const handleInputFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(uploadPic(reader.result));
      // setPic(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async () => {
    const res = await register(regData);
    //if (user.pic) regData["pic"] = user.pic;
    console.log(res);
    if (res?.statusCode === 200) {
      console.log("adasdadas");
      navigate("/login");
    }
  };
  if (user._id) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="auth-cont">
      <div>
        <h2 className="auth-heading">Create an account</h2>
        <div>
          <div className="profile-pic">
            <input onChange={handleInputFile} type="file" name="" id="file" />
            <label htmlFor="file" id="uploadBtn">
              <img id="photo" src={user.avatar ? user.avatar : avatar} />
            </label>
          </div>
          <p className="profile-text">Choose Profile</p>
        </div>
        <div className="details-cont">
          <p>Name</p>
          <input onChange={handleChange} name="username" className="inputcom" />

          <p>Email</p>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            className="inputcom"
          />

          <p>Password</p>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="inputcom"
          />

          <p>Confirm Password</p>
          <input type="password" className="inputcom" />

          {loading ? (
            <ColorButton disabled>
              <CircularProgress style={{ color: "white" }} />
            </ColorButton>
          ) : (
            <ColorButton onClick={handleSubmit}>Continue</ColorButton>
          )}

          <Link className="auth-link" to={"/login"}>
            Already have an account
          </Link>
          <p className="contract">
            By registering you agree to Messenger's{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));
