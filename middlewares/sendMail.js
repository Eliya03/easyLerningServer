const nodemailer = require("nodemailer");
require("dotenv").config();

//Email sending function
module.exports = async (email, subject, text) => {
  // initialize and define the mode of transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "roie1158@gmail.com", // Gmail address
      pass: "gogw vcxa xrmb akdz", // Gmail password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "roie1158@gmail.com", 
    to: email,
    subject: subject,
    text: text,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error:", error);
    }
    console.log(" The message with code : " + text + " sent to : " + email);
  });
};