const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getAllProjectCards } = require('../controllers/getAllProjectCards');

router.get('/getAllProjectCards', getAllProjectCards);

module.exports = router;
