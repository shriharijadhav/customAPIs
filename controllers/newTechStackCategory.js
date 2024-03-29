require('dotenv').config();
const techStackCategory = require('../models/techStackCategory');

exports.newTechStackCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    // check if already exists in database
    const fetchedCategory = await techStackCategory.findOne({
      categoryName: categoryName,
    });

    if (fetchedCategory) {
      return res.status(403).json({
        success: false,
        message: 'Creation failed. Category already exists. ',
      });
    }

    // otherwise create new category
    const newCategory = await techStackCategory.create({
      categoryName,
    });

    res.status(200).json({
      success: true,
      message:
        'Category created successfully with name -' + newCategory.categoryName,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new creating category',
    });
  }
};
