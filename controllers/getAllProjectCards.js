require('dotenv').config();
const projectCardModel = require('../models/projectCardModel');

exports.getAllProjectCards = async (req, res) => {
  try {
    // otherwise create new category
    const receivedAllProjectCards = await projectCardModel.find();

    res.status(200).json({
      success: true,
      message: receivedAllProjectCards,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new creating category',
    });
  }
};
