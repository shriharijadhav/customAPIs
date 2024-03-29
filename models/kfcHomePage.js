const mongoose = require('mongoose');

const kfcHomePageSchema = new mongoose.Schema({
  kfcHomePage: {
    type: Object,
    required: true,
  },});

const kfcHomePageModel = mongoose.model('kfcHomepageModel', kfcHomePageSchema);
module.exports = kfcHomePageModel;
