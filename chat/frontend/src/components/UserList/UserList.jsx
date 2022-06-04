import React from "react";
import "./UserList.css";

const UserList = ({ user, handleFunction }) => {
  return (
    <div className="userlist">
      <div className="userlist__container" onClick={handleFunction}>
        <div className="userlist__container__left">
          <img src={user.profilePic} alt="" className="userlist__image" />
        </div>
        <div className="userlist__container__right">
          <h6 className="userlist__username">{user.fullName}</h6>
          <h6 className="userlist__email">Email : {user.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default UserList;
