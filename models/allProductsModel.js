const mongoose = require('mongoose');

const allProductSchema = new mongoose.Schema({
    allProductsData: {
    type: Object,
    required: true,
  },});

const allProductsModel = mongoose.model('allProductsModel', allProductSchema);
module.exports = allProductsModel;
