const express = require('express');
const router = express.Router();

// get all handlers from controller
const { newExperience } = require('../controllers/newExperience');

router.post('/newExperience', newExperience);

module.exports = router;
