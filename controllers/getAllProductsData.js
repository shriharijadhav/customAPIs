require('dotenv').config();

const allProductsModel = require('../models/allProductsModel');


exports.getAllProductsData = async (req, res) => {
  try {
    // Fetch data from the database
    const receivedAllProductData = await allProductsModel.find();

    // Check if data was found
    if (receivedAllProductData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data found in the database',
      });
    }

    // Data found, send it in the response
    res.status(200).json({
      success: true,
      message: receivedAllProductData,
    });
  } catch (error) {
    console.error('Error fetching KFC homepage data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
