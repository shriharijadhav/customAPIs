const express = require('express');
const router = express.Router();

// get all handlers from controller
const { getAllExperience } = require('../controllers/getAllExperience');

router.get('/getAllExperience', getAllExperience);

module.exports = router;
