//<-------------------------------------Imports----------------------------------------->
const { request } = require("express");
const express = require("express");
const router = express.Router();
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Message = require("./models/Message");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("./helper_functions");

//<-----------------------------------Welcome API--------------------------------------->
router.get("/", async (req, res) => {
  res.send("server is up and running");
});

//<-----------------------------------SignUp API---------------------------------------->
router.post("/signup", async (req, res) => {
  //res.send("server is up and running");
  const email = req.body.email.trim().toLowerCase();
  const hashed = await bcrypt.hash(req.body.password, 10);
  const fullName = req.body.fullName.trim();
  const username = req.body.username.trim();
  try {
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashed,
    });
    helper.generateAndSendToken(email);
    res.send(JSON.stringify({ status: "Success" }));
  } catch (err) {
    console.log(err);
    res.send(
      JSON.stringify({
        status: "Error",
        message:
          "There was an error creating the account. Please try again with different credentials.",
      })
    );
  }
});
//<------------------------------Verify OTP API------------------------------------------->
router.post("/verify-otp", async (req, res) => {
  const isValid = helper.verifyToken(req.body.OTP);
  console.log(req.body.OTP);
  console.log(isValid);
  if (isValid) {
    console.log(req.body.email);
    await User.updateOne(
      { email: req.body.email },
      {
        isVerified: true,
      }
    );
    res.json({ status: "Success", message: "OTP verified" });
  } else {
    res.json({ status: "Error", message: "OTP not Verified" });
  }
});
//<------------------------------SignIn API------------------------------------------->
router.post("/signin", async (req, res) => {
  const email_username = req.body.email_username.trim();
  const password = req.body.password;
  const user = await User.findOne({
    $or: [{ email: email_username }, { username: email_username }],
  });
  if (!user) {
    res.json({
      status: "Error",
      message: "User with the given username/email was not found.",
    });
  } else {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.json({ status: "Error", message: "Incorrect Password." });
    } else {
      const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.json({
        status: "Success",
        message: "User has been logged in.",
        token: access_token,
      });
    }
  }
});
//<------------------------------SignIn API------------------------------------------->
router.get("/user", async (req, res) => {
  const userId = req.query.userId;
  try {
    const user = await User.findById(userId);
    const { password, date, isVerified, ...other } = user._doc;
    res.status(200).json({ status: "Success", data: other });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err });
  }
});
//<------------------------------New Conversation API------------------------------------------->
router.post("/conversation", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json({
      status: "Success",
      data: savedConversation,
    });
  } catch (err) {
    res.status(500).json({ status: "Error", message: err });
  }
});

//<------------------------------Get Conversations API------------------------------------------->
router.get("/conversation/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ status: "Success", data: conversation });
  } catch (err) {
    res.status(500).json({ status: "Error", Error: err });
  }
});
//<------------------------------New Message API------------------------------------------->
router.post("/message", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json({ status: "Success", data: savedMessage });
  } catch (err) {
    res.status(500).json({ status: "Error", Error: err });
  }
});
//<------------------------------Get Messages API------------------------------------------->
router.get("/messages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({ status: "Success", data: messages });
  } catch (err) {
    res.status(500).json({ status: "Error", Error: err });
  }
});
module.exports = router;
