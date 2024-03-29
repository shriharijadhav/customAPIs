require('dotenv').config();
const pharmEasyHomepageModel = require('../models/pharmEasyHomepageModel');

exports.getPharmEasyHomepageData = async (req, res) => {
  try {
    // Fetch data from the database
    const receivedPharmEasyHomepageData = await pharmEasyHomepageModel.find();

    // Check if data was found
    if (receivedPharmEasyHomepageData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data found in the database',
      });
    }

    // Data found, send it in the response
    res.status(200).json({
      success: true,
      message: receivedPharmEasyHomepageData,
    });
  } catch (error) {
    console.error('Error fetching KFC homepage data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
