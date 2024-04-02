const mongoose = require('mongoose');

const pharmEasyBuyProductSchema = new mongoose.Schema({
  pharmEasyBuyProduct: {
    type: Object,
    required: true,
  },});

const pharmEasyBuyProductModel = mongoose.model('pharmEasyBuyProductModel', pharmEasyBuyProductSchema);
module.exports = pharmEasyBuyProductModel;
