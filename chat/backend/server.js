const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

// server PORT
dotenv.config();

//db connection
connectDB();

// creating instance of express application
const app = express();

app.use(express.json()); // to accept JSON data

const PORT = process.env.PORT || 8000;

// backend routing
app.get("/", (req, res) => {
    res.send("Api is running");
});

app.use("/api/user", userRoutes);

app.use("/api/chat", chatRoutes);

// listening at port 8000
app.listen(8000, () => console.log(`Server running on PORT ${PORT}`));