import React from "react";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, chats } = ChatState();

  console.log(user);

  return (
    <div className="profile__page">
      <div className="profile__page__container">
        <div className="profile__page__navbar">
          <div className="profile__logo_section">
            <img src="./logo.png" alt="" className="profile__logo" />
            <h6 className="navbar__logo__name">Chatify</h6>
          </div>
          <div className="profile__heading">
            <h4 className="profile__heading">Your profile</h4>
          </div>
          <div className="profile__buttons">
            <button className="profile">Profile</button>
            <Link to="/chat" onClick={() => window.onload()}>
              <button className="chats">Chats</button>
            </Link>
            <Link to="/">
              <button
                onClick={() => localStorage.removeItem("userInfo")}
                className="logout"
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
        <div className="profile__details">
          <div className="profile__details__left">
            <img className="profile__image" src={user.profilePic} alt="" />
            <h4 className="profile__username">{user.fullName}</h4>
          </div>
          <div className="profile__details__right">
            <h4 className="profile__details__heading">Profile Details</h4>
            <h4 className="profile__info"> Fullname : {user.fullName} </h4>
            <h4 className="profile__info"> Username : {user.userName} </h4>
            <h4 className="profile__info"> Email : {user.email} </h4>
            <h4 className="profile__info"> Contact : {user.mobileNumber} </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
