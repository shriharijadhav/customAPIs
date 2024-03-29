const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getKfcHomePageData } = require('../controllers/kfcHomePage');

router.get('/getKfcHomePageData', getKfcHomePageData);

module.exports = router;
