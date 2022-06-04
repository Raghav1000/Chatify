import React from "react";
import "./Navbar.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../ChatLoading/ChatLoading";
import UserList from "../UserList/UserList";
import { useEffect } from "react";
// import SearchPop from "../SearchPop/SearchPop";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something");
    }

    try {
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
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__search">
          <BiSearch
            className="navbar__search__icon"
            fill="darkgyay"
            size="19px"
          />
          <button
            onClick={() => setClick((prevState) => !prevState)}
            className="chat__search"
          >
            Search users
          </button>
        </div>
        <div className="navbar__logo_section">
          <img src="./logo.png" alt="" className="navbar__logo" />
          <h6 className="navbar__logo__name">Chatify</h6>
        </div>

        <div className="navbar__buttons">
          <Link to="/profile">
            <button className="profile">Profile</button>
          </Link>
          <button className="chats">Chats</button>
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
      {click && (
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
            <button
              onClick={handleSearch}
              className="search__interaction__button"
            >
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
      )}
    </div>
  );
};

export default Navbar;
