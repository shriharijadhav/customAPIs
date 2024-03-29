const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  designation: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogoUrl: {
    type: String,
    required: true,
  },

  periodOfService: {
    type: String,
    required: true,
  },
  bgColorClass: {
    type: String,
    required: true,
  },
  ringColorClass: {
    type: String,
    required: true,
  },
  textColorClass: {
    type: Object,
    required: true,
  }
});

const experienceModel = mongoose.model('experienceModel', experienceSchema);
module.exports = experienceModel;
