const express = require('express');
const router = express.Router();

// get all handlers from controller
const { newProjectCard } = require('../controllers/newProjectCard');

router.post('/newProjectCard', newProjectCard);

module.exports = router;
