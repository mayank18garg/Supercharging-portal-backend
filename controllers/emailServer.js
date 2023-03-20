const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'mgargtesla@gmail.com',
      pass: 'zhvarjagxeivyuxa',
    }
  });

module.exports = transporter;