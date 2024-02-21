const express = require("express");
const router = express.Router();
const login = require("../Controller/Login");
const signup = require("../Controller/Signup");
const verifyToken = require("../auth/verifyToken");
const UserDetails = require("../Controller/UserDetails");
const DisplayFriends = require("../Controller/DisplayFriends");
const AddFriendtoMessage = require("../Controller/AddFriendtoMessage");
const AddFriendtoUser = require("../Controller/AddFriendtoUser");
const AddMessage = require("../Controller/AddMessage");
const DisplayMessages = require("../Controller/DisplayMessages");

router.post("/login", login);
router.post("/signup", signup);
router.get("/userdetails", verifyToken, UserDetails);
router.post("/addfriendtomessage", verifyToken, AddFriendtoMessage);
router.post("/addfriendtouser", verifyToken, AddFriendtoUser);
router.get("/displayfriends", verifyToken, DisplayFriends);
router.post("/addmessage", verifyToken, AddMessage);
router.get("/displaymessages", verifyToken, DisplayMessages);

module.exports = router;
