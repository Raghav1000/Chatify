const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    addToGroup,
    removeFromGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// accessing/creating the chat
router.route("/").post(protect, accessChat);

// get all the chats for a particular user
router.route("/").get(protect, fetchChats);

// for group creation
router.route("/group").post(protect, createGroupChat);

router.route("/groupremove").put(protect, removeFromGroup);

router.route("/groupadd").put(protect, addToGroup);

module.exports = router;