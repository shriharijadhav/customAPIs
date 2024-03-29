const mongoose = require('mongoose');

const pharmEasySchema = new mongoose.Schema({
  pharmEasyHomepage: {
    type: Object,
    required: true,
  },});

const KfcMenuDetailsModel = mongoose.model('pharmEasyHomepageModel', pharmEasySchema);
module.exports = KfcMenuDetailsModel;
