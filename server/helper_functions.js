import { totp } from "otplib";
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
module.exports = {
  generateAndSendToken: async (email) => {
    //-----------------------------------OTP Generation---------------------------------------//
    const secret = process.env.OTP_SECRET;
    totp.options = { step: 300, window: 1, digits: 4 };
    const token = await totp.generate(secret);
    //-------------------------------Nodemailer-----------------------------------------------//
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "process.env.EMAIL_USER",
      to: email,
      subject: "Your Chat-App OTP",
      text: `Your OTP: ${token}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        console.log("Email sent: " + info.response);
        return true;
      }
    });
  },
  //---------------------------------------Verify Token-----------------------------------------//
  verifyToken: async (token) => {
    const secret = process.env.OTP_SECRET;
    const isValid = await totp.check(token, secret);
    console.log("YO", isValid);
    return isValid;
  },
  //---------------------------------------Auth Middleware-----------------------------------------//
  auth: async (req, res, next) => {
    const token = req.headers["authorization"];
    token = token.split(" ")[1]; // Access Token
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (user) {
        req.user = user;
        next();
      } else if (err.message === "jwt expired") {
        return res.json({ status: "Error", message: "Access token Invalid" });
      } else {
        console.log(err);
        return res.status(400).send({ err, message: "User not authenticated" });
      }
    });
  },
  //---------------------------------------TODO: Refresh Token-----------------------------------------//
};
