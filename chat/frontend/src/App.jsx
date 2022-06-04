import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ChatPage from "./pages/ChatPage/ChatPage";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
