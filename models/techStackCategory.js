const mongoose = require('mongoose');

const techStackCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

const techStackCategoryModel = mongoose.model(
  'techStackCategory',
  techStackCategorySchema
);
module.exports = techStackCategoryModel;
