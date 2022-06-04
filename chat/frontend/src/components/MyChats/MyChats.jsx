import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import "./MyChats.css";
import { getSender } from "../../config/ChatLogics";
import { getSenderImage } from "../../config/ChatLogics";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, chats, setChats } = ChatState();

  // git config --global user.email "you@example.com"
  // git config --global user.name "Your Name"

  console.log("chatssssss", chats);
  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  // chats.map((chat) => {
  //   console.log(chat.isGroupChat);
  // });

  // console.log(result);

  return (
    <div className="myChats">
      <div className="myChats__container">
        <div className="myChats__container__top">
          <h4 className="myChats__container__title">My chats</h4>
          <div className="myChats__groupbutton">
            <button className="groupChat"> Create a group </button>
          </div>
        </div>
        {chats.length > 0 && (
          <div className="displayChat__container">
            {chats.map(
              (chat) =>
                chat.users.length > 1 &&
                chat.users.length > 1 && (
                  <div key={chat._id} className="displayChat__mychats">
                    <img
                      className="myChat__chat__image"
                      style={{ width: "40px" }}
                      src={`${
                        !chat.isGroupChat &&
                        getSenderImage(loggedUser, chat.users)
                      }`}
                      alt=""
                    />
                    <h1 className="myChat__chat__title">
                      {!chat.isGroupChat && getSender(loggedUser, chat.users)}
                    </h1>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
