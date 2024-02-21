const User = require("../models/User");

const AddFriendtoUser = async (req, res) => {
  try {
    const id = req.user.userId;
    var { name, mobile } = req.body;
    const currentuser = await User.findById(id);
    const frienduser = await User.findOne({ phonenumber: mobile });

    if (!frienduser) {
      return res.status(400).json({ message: "user not found" });
    }

    if (mobile == currentuser.phonenumber) {
      const ismealready = currentuser.friends.some(
        (friend) => friend.mobile === mobile
      );
      if (!ismealready) {
        currentuser.friends.push({
          name: currentuser.username,
          mobile: currentuser.phonenumber,
        });
        await currentuser.save();
        return res.status(200).json({
          message: "you are friend of you with same as your username",
        });
      }
      return res.status(400).json({
        message: "you are already friend of you with same as your username",
      });
    }

    const isFriendAlreadyAdded = currentuser.friends.some(
      (friend) => friend.mobile === mobile
    );
    const isCurrentAlreadyAdded = frienduser.friends.some(
      (friend) => friend.mobile === currentuser.phoneNumber
    );

    if (isFriendAlreadyAdded) {
      return res.status(400).json({ message: "He/she is already your friend" });
    } else {
      if (!name) {
        name = frienduser.username;
        mobile = mobile;
      }
      currentuser.friends.push({ name, mobile });
      await currentuser.save();
    }
    if (isCurrentAlreadyAdded) {
      return res
        .status(400)
        .json({ message: "You are already a friend to him/her" });
    } else {
      frienduser.friends.push({
        name: currentuser.username,
        mobile: currentuser.phonenumber,
      });
    }

    await frienduser.save();
    return res
      .status(200)
      .json({ message: "friend added to user table successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = AddFriendtoUser;
