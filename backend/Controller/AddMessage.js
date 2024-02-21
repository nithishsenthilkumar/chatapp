const User = require("../models/User");
const Message = require("../models/Message");

const AddMessage = async (req, res) => {
  try {
    const id = req.user.userId;
    var { mobile, text } = req.body;
    const frienduser = await User.findOne({ phonenumber: mobile });

    if (!frienduser) {
      return res.status(400).json({ message: "user not found" });
    }

    if(id.toString() === frienduser._id.toString())
    {
      await Message.findOneAndUpdate(
        {
          userId: id,
          "friendId.friendId": id,
        },
        { $push: { "friendId.$.messages": { senderId: id, content: text } } },
        { upsert: true }
      );

      return res.status(200).json({message: "your message was added inyour chat"});
    }

    await Message.findOneAndUpdate(
      {
        userId: id,
        "friendId.friendId": frienduser._id,
      },
      { $push: { "friendId.$.messages": { senderId: id, content: text } } },
      { upsert: true }
    );

    await Message.findOneAndUpdate(
      {
        userId: frienduser._id,
        "friendId.friendId": id,
      },
      {
        $push: {
          "friendId.$.messages": { senderId: id, content: text },
        },
      },
      { upsert: true }
    );

    res.status(200).json({ message: "Message added successfully." });
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = AddMessage;
