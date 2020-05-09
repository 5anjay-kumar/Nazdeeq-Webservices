const nodemailer = require('nodemailer');
const config = require("./config.js");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.user,
    pass: config.pass
  }
});


const mailOptions = {
  from: config.user,
  to: '',
  subject: 'Welcome to Nazdeeq!',
  html: ''
};


module.exports.sendEmail = function (toEmail, firstName) {
  htmlCode = "<a href='https://ibb.co/BnYvM32'><img src='https://i.ibb.co/BnYvM32/logo.png' alt='logo' border='0'></a>  <p>Dear " + firstName + ",</p> <p> Welcome to the Nazdeeq family! </p> "
  
  mailOptions.to = toEmail;
  mailOptions.html = htmlCode;
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}