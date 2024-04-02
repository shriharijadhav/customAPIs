const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getAllProductsData } = require('../controllers/getAllProductsData');

router.get('/getAllProductsData', getAllProductsData);

module.exports = router;
