const User = require("../models/User");

const UserDetails = (req, res) => {
  var id = req.user.userId;
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        username: user.username,
        email: user.email,
        mobile: user.phonenumber,
      });
    })
    .catch((error) => {
      console.log("Error fetching user details: ", error.message);
      res.status(500).json({ message: "Internal server Error. " });
    });
};

module.exports = UserDetails;
