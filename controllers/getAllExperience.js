require('dotenv').config();
const experienceModel = require('../models/experienceModel');

exports.getAllExperience = async (req, res) => {
  try {
    // otherwise create new category
    const receivedAllExperiences = await experienceModel.find();

    res.status(200).json({
      success: true,
      message: receivedAllExperiences,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new creating category',
    });
  }
};
