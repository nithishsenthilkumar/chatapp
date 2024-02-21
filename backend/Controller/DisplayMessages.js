const Message = require("../models/Message");
const User = require("../models/User");

const DisplayMessages = async (req, res) => {
  try {
    const id = req.user.userId;
    const { mobile } = req.query;
    const frienduser = await User.findOne({ phonenumber: mobile });

    const messages = await Message.findOne({
      userId: id,
    });

    if (!messages) {
      return res
        .status(400)
        .json({ message: "No messages found for the current user" });
    } else {
      const friendMessages = messages.friendId.find(
        (friend) => friend.friendId.toString() === frienduser._id.toString()
      );
      if (friendMessages) {
        return res.status(200).json({ messages: friendMessages.messages, userId: id });
      } else {
        return res
          .status(400)
          .json({ message: "No messages found for the given friend" });
      }
    }
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = DisplayMessages;
