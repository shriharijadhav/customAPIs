const mongoose = require('mongoose');

const projectCardSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectLogoUrl: {
    type: String,
    required: true,
  },
  projectLogoAltText: {
    type: String,
    required: true,
  },

  projectDescription: {
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
    type: String,
    required: true,
  },
  projectHostedLink:{
    type: String,
    required: true,
  }
});

const projectCardModel = mongoose.model('projectCardModel', projectCardSchema);
module.exports = projectCardModel;
