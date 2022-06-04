const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
}, { timestamps: { createdAt: "created_at" } });

const Message = mongoose.model("Message", userSchema);

module.exports = Message;