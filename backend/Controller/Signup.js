const User = require("../models/User");
const Message = require("../models/Message");

const signup = async (req, res) => {
  try {
    const { username, email, phonenumber, password, confirmpassword } =
      req.body;

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, email, phonenumber, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = signup;
