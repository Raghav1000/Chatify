import React from "react";
import { useState } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import MyChats from "../../components/MyChats/MyChats";
import Navbar from "../../components/Navbar/Navbar";
import { ChatState } from "../../Context/ChatProvider";
import "./ChatPage.css";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  const { user, chats } = ChatState();

  console.log(user);

  return (
    <div className="chat__page">
      {user && <Navbar />}

      <div className="chat__page__lower">
        {<MyChats fetchAgain={fetchAgain} />}
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage;
