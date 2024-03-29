const express = require('express');
const router = express.Router();

// get all handlers from controller
const { newTechStackCategory } = require('../controllers/newTechStackCategory');

router.post('/newTechStackCategory', newTechStackCategory);

module.exports = router;
