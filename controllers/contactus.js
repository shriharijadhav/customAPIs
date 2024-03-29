const ContactUsModel = require('../models/ContactUsModel');
require('dotenv').config();


exports.ContactUs = async (req, res) => {
    try {
      // fetch data from req body
      // console.log('request',req);
      const { name, email,message } = req.body;
      console.log(name, email,message);
  
      // make an entry to mongo DB after successful upload
      const insertedContactUs = await ContactUsModel.create({
        name:name,
        email:email,
        message:message,
       });
  
      // send success response
      res
        .status(200)
        .json({ message: 'Email saved successfully', success: true });
    } catch (error) {
      console.log('error=', error.message);
      res.json({
        success: false,
        message: 'Error while saving feedback',
      });
    }
  };