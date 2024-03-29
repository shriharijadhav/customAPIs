const mongoose = require('mongoose');

const techStackImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    required: true,
  },
  widthOfImage: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

const techStackImage = mongoose.model('techStackImage', techStackImageSchema);
module.exports = techStackImage;
