const express = require('express');
const router = express.Router();

// get all handlers from controller
const { ContactUs } = require('../controllers/contactus');

router.post('/ContactUs', ContactUs);

module.exports = router;
