import React from "react";
import "./Register.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdCall } from "react-icons/md";
import { HiUser } from "react-icons/hi";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState();
  const [profilePic, setprofilePic] = useState();
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (profilePic) => {
    if (profilePic === undefined) {
      alert("Please select an image");
      return;
    }
    console.log(profilePic);
    if (profilePic.type === "image/jpeg" || profilePic.type === "image/png") {
      const data = new FormData();
      data.append("file", profilePic);
      data.append("upload_preset", "chatify");
      data.append("cloud_name", "dqvhfq77g");

      fetch("https://api.cloudinary.com/v1_1/dqvhfq77g/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setprofilePic(data.url.toString());
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitHandler = async () => {
    if (!fullName || !userName || !email || !mobileNumber || !password) {
      alert("Please fill every field.");
      return;
    }

    // else storing the data inside MongoDB
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          fullName,
          userName,
          email,
          mobileNumber,
          password,
          profilePic,
        },
        config
      );

      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Registration Successful");

      navigate("/chat");
    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 409) alert("Email already exists");
      else {
        alert("Not successful ! Re-try");
      }
    }
  };

  return (
    <div className="register">
      <div className="register">
        <div className="register__container">
          <div className="register__left">
            <img src="./logo.png" alt="" className="logo" />
            <h4 className="title">Chatify</h4>
          </div>
          <div className="register__right">
            <h4 className="greeting__register">Register</h4>
            <div className="register__form">
              <HiUser className="user__icon" fill="lightgray" size="22px" />
              <input
                type="text"
                required
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />

              <HiUser className="username__icon" fill="lightgray" size="22px" />
              <input
                type="text"
                required
                minLength="6"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <MdEmail className="mail__icon" fill="lightgray" size="22px" />
              <input
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdCall className="call__icon" fill="lightgray" size="22px" />
              <input
                type="text"
                required
                minLength="10"
                placeholder="Mobile Number"
                onChange={(e) => setMobileNumber(e.target.value)}
              />

              <div className="password__icons">
                <RiLockPasswordFill
                  className="lock__icon__1"
                  fill="lightgray"
                  size="21px"
                />

                <BiShow
                  className="show__icon"
                  fill="rgb(45, 45, 45)"
                  size="22px"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <input
                type={show ? "text" : "password"}
                required
                minLength="6"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="upload">
                <label className="upload__pic__label">Upload profile pic</label>
                <input
                  className="upload__pic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>

              <button className="register__but" onClick={submitHandler}>
                Create
              </button>
              <span>Already have an account ?</span>
              <Link to="/login">
                <button className="login__but">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
