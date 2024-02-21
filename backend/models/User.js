const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value.toString().length == 10;
      },
      message: "Please check the Mobile Number",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.toString().length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
  friends: [
    {
      name: String,
      mobile: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
