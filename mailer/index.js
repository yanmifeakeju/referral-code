'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

async function main(ref) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"yanmifeakeju@gmail.com" <yanmifeakeju@gmail.com>',
    to: ref.email,
    subject: `Hello ${ref.name}`, // Subject line
    text: `Here is your referral code: ${ref.code}`, // plain text body
    html: `<p>Here is your referral code: <b>${ref.code}</b></p>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  return info;
}

// main({ name: 'Oluwayanmife Akeju', code: '4444' }).catch(console.error);

module.exports = main;
