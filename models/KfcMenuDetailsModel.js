const mongoose = require('mongoose');

const kfcMenuSchema = new mongoose.Schema({
  kfcHomePage: {
    type: Object,
    required: true,
  },});

const KfcMenuDetailsModel = mongoose.model('KfcMenuDetailsModel', kfcMenuSchema);
module.exports = KfcMenuDetailsModel;
