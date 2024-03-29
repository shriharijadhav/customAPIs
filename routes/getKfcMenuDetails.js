const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getKfcMenuDetails } = require('../controllers/getKfcMenuDetails');

router.get('/getKfcMenuDetails', getKfcMenuDetails);

module.exports = router;
