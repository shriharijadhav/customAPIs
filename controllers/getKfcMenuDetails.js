require('dotenv').config();
const KfcMenuDetailsModel = require('../models/KfcMenuDetailsModel');

exports.getKfcMenuDetails = async (req, res) => {
  try {
    // Fetch data from the database
    const receivedKfcHomepageData = await KfcMenuDetailsModel.find();

    // Check if data was found
    if (receivedKfcHomepageData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data found in the database',
      });
    }

    // Data found, send it in the response
    res.status(200).json({
      success: true,
      message: receivedKfcHomepageData,
    });
  } catch (error) {
    console.error('Error fetching KFC homepage data:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
