require('dotenv').config();
const techStackImageModel = require('../models/techStackImage');

exports.getAllTechStack = async (req, res) => {
  try {
    // otherwise create new category
    const receivedAllTechStack = await techStackImageModel.find();

    res.status(200).json({
      success: true,
      message: receivedAllTechStack,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new creating category',
    });
  }
};
