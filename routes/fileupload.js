const express = require('express');
const router = express.Router();

// get all handlers from controller
const { newTechStackItem } = require('../controllers/fileupload');

router.post('/newTechStackItem', newTechStackItem);

module.exports = router;
