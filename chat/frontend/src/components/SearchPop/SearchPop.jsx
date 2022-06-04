import React from "react";
import "./SearchPop.css";
import "../Navbar/Navbar.css";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserList from "../UserList/UserList";

const SearchPop = () => {
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const { user, setSelectedChat, chats, setChats } = ChatState();

  console.log(user);
  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something");
    }

    try {
      console.log("--------", user.token);
      console.log("Succesfully called");
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setLoading(false);
      setSelectedChat(data);
      setClick((prevState) => !prevState);
    } catch (error) {
      alert("Error fetching");
    }
  };

  return (
    <div className="search__section">
      <div className="search__title">
        <h4 className="search__users">Search users</h4>
        <button onClick={() => setClick(!click)} className="close">
          close
        </button>
      </div>
      <div className="search__interaction">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="search__interaction__input"
          type="text"
        />
        <button onClick={handleSearch} className="search__interaction__button">
          Go
        </button>
      </div>
      {searchResult?.map((user) => (
        <UserList
          key={user._id}
          user={user}
          handleFunction={() => accessChat(user._id)}
        />
      ))}
    </div>
  );
};

export default SearchPop;
