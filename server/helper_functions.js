import { totp } from "otplib";
const nodemailer = require("nodemailer");
module.exports = {
  generateAndSendToken: async (email) => {
    //-----------------------------------OTP Generation---------------------------------------//
    const secret = process.env.OTP_SECRET;
    totp.options = { step: 300, window: 1, digits: 4 };
    const token = totp.generate(secret);
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
  verifyToken: (token) => {
    const secret = process.env.OTP_SECRET;
    const isValid = totp.check(token, secret);
    console.log("YO", isValid);
    return isValid;
  },
};
