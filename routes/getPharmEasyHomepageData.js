const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getPharmEasyHomepageData } = require('../controllers/getPharmEasyHomepageData');

router.get('/getPharmEasyHomepageData', getPharmEasyHomepageData);

module.exports = router;
