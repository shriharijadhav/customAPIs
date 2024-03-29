const mongoose = require('mongoose');

require('dotenv').config();
//nodemailer instance
const nodemailer = require('nodemailer');

const contactus = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
});

// post middleware after saving a document to database
contactus.post('save', async function (document) {
  try {
    // console.log('Document saved to database', document);

    //  create transporter instance
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // send mail
    let info = await transporter.sendMail({
      from: `Portfolio-Contact Us`,
      to: `mr.shrihari212@gmail.com`,
      subject: 'Feedback/Enquiry from Portfolio site',
      html: `<h3>Visitor's name:${document.name}</h3>  <h3>Visitor's Email: ${document.email}</h3>  <h3>Visitor's Message: ${document.message}</h3> `,
    });

    // console.log(info);
  } catch (error) {
    console.log(error);
  }
});

const ContactUsModel = mongoose.model('contactus', contactus);
module.exports = ContactUsModel;
