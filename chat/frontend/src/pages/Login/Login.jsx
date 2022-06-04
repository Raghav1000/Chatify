import React from "react";
import "./Login.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BiShow } from "react-icons/bi";
import { useEffect } from "react";

const Login = () => {
  let navigate = useNavigate();

  // const user = JSON.parse(localStorage.getItem("userInfo"));
  // useEffect(() => {
  //   if (user) {
  //     navigate("/chat");
  //   }
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    console.log(email, password);

    if (!email || !password) {
      alert("Please fill all the fields");
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/user/login",
          { email, password },
          config
        );

        localStorage.setItem("userInfo", JSON.stringify(data));

        alert("Login Successful");

        setEmail();
        setPassword();

        navigate("/chat", { replace: true });
      } catch (err) {
        alert(`Invalid credentials`);
      }
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <img src="./logo.png" alt="" className="logo" />
          <h4 className="title">Chatify</h4>
        </div>
        <div className="login__right">
          <h4 className="greeting">Login</h4>
          <div className="login__form">
            <MdEmail
              className="mail__icon__login"
              fill="lightgray"
              size="22px"
            />
            <RiLockPasswordFill
              className="lock__icon__login"
              fill="lightgray"
              size="22px"
            />
            <BiShow
              className="show__icon__login"
              fill="rgb(45, 45, 45)"
              size="22px"
              onClick={(e) => setPassword(handleClick)}
              style={{ cursor: "pointer" }}
            />
            <input
              type="email"
              required
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type={show ? "text" : "password"}
              required
              value={password}
              minLength="6"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login__button" onClick={submitHandler}>
              Login
            </button>
            <span>Don't have an account ?</span>
            <Link to="/">
              <button className="register__button">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
