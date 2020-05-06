const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

const senderEmail = '160553@students.au.edu.pk';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass: '160553@Students' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: senderEmail,
  to: '',
  subject: 'Welcome to Nazdeeq',
  text: 'Thank you for joining us!'
};

module.exports.sendEmail = function (toEmail) {
  mailOptions.to = toEmail;
  transporter.sendMail(mailOptions, function (err, info) {
      if (err)
          console.log(err)
      else
          console.log(info);
  });
}