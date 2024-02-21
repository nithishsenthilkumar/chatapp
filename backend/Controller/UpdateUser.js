const User = require("../models/User");

const UpdateUser = async (req, res) => {
  var id = req.user.userId;

  try {
    const user = await User.findbyId(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phonenumber = req.body.phonenumber || user.phonenumber;

    await user.save();

    res.staus(200).json({ message: "saved successfully" });
  } catch (error) {
    console.error("Error updating user details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = UpdateUser;