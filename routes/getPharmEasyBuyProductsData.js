const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getPharmEasyBuyProductData } = require('../controllers/getPharmEasyBuyProductData');

router.get('/getPharmEasyBuyProductData', getPharmEasyBuyProductData);

module.exports = router;
