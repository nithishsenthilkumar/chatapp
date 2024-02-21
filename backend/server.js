const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const router = require("./Routes/Routes");
require("dotenv").config();

//Port number from env file
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//use routers
app.use("/", router);

//Connect with MongoDB
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connection successfully with mongoDB");
  } catch (error) {
    console.log("Connection error", error.message);
  }
};

connectDB();

//Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on the port ${port}`);
});
