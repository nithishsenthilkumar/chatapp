const User = require("../models/User");

const DisplayFriends = async (req, res) => {
  try {
    var id = req.user.userId;
    const currentuser = await User.findById(id);

    if (!currentuser) {
      return res.status(400).json({ message: "user not found" });
    }
    const friendsarray = currentuser.friends;
    return res.status(200).json({ friends: friendsarray });
  } catch (error) {
    console.error("Error displaying friends:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = DisplayFriends;