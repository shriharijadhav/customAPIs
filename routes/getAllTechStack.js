const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getAllTechStack } = require('../controllers/getAllTechStack');

router.get('/getAllTechStack', getAllTechStack);

module.exports = router;
