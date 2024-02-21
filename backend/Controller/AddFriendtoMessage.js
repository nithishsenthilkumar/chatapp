const User = require("../models/User");
const Message = require("../models/Message");

const AddFriendtoMessage = async (req, res) => {
  try {
    var id = req.user.userId;
    var { name, mobile } = req.body;

    const currentuser = await User.findById(id);
    const frienduser = await User.findOne({ phonenumber: mobile });
    if (!frienduser) {
      return res.status(400).json({ message: "user not found" });
    }

    var [usermessage, friendmessage] = await Promise.all([
      Message.findOne({ userId: id }),
      Message.findOne({ userId: frienduser._id }),
    ]);

    if (currentuser.id === frienduser._id.toString()) {
      if (!usermessage) {
        usermessage = new Message({
          userId: id,
          friendId: [{ friendId: id, messages: [] }],
        });
      } else {
        var isamalready = usermessage.friendId.some(
          (e) => e.friendId.toString() === id.toString()
        );
        if (!isamalready) {
          usermessage.friendId.push({ friendId: id, messages: [] });
        } else {
          return res
            .status(400)
            .json({ message: " you are already your friend" });
        }
      }
      await usermessage.save();
      return res.status(200).json({
        message: "You are added to your own friend list with your id",
      });
    } else {
      var [usermessage, friendmessage] = await Promise.all([
        Message.findOne({ userId: id }),
        Message.findOne({ userId: frienduser._id }),
      ]);

      if (!usermessage) {
        usermessage = new Message({
          userId: id,
          friendId: [{ friendId: frienduser._id, messages: [] }],
        });
      } else {
        var isamalready = usermessage.friendId.some(
          (e) => e.friendId.toString() === frienduser._id.toString()
        );
        if (!isamalready) {
          usermessage.friendId.push({ friendId: frienduser._id, messages: [] });
        }
      }

      if (!friendmessage) {
        friendmessage = new Message({
          userId: frienduser._id,
          friendId: [{ friendId: id, message: [] }],
        });
      } else {
        var isamalready = friendmessage.friendId.some(
          (e) => e.friendId.toString() === id.toString()
        );
        if (!isamalready) {
          friendmessage.friendId.push({ friendId: id, messages: [] });
        }
      }
      await Promise.all([usermessage.save(), friendmessage.save()]);
      return res
        .status(200)
        .json({ message: "Friend added successfully to the message block" });
    }
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = AddFriendtoMessage;
