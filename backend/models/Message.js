const mongoose = require("mongoose");

const messageSubcollectionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,  
  },
});

const friendCollectionSchema = new mongoose.Schema({
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [messageSubcollectionSchema],
});

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  friendId: [friendCollectionSchema],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
