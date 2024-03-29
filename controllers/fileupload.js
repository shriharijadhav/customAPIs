require('dotenv').config();
const { response } = require('express');
const techStackImageModel = require('../models/techStackImage');

const cloudinary = require('cloudinary').v2;

//
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.newTechStackItem = async (req, res) => {
  try {
    const { imageName, altText, widthOfImage, category } = req.body;
    const fileFromRequest = req.files.file;
    console.log(fileFromRequest);

    // validate if the techStack image is svg or not
    const supportedFileTypes = ['svg'];
    const fileTypeOfReceivedFile = fileFromRequest.name
      .split('.')[1]
      .toLowerCase();

    console.log(supportedFileTypes.includes(fileTypeOfReceivedFile));
    if (!supportedFileTypes.includes(fileTypeOfReceivedFile)) {
      res.status(500).json({
        success: false,
        message:
          'TechStack image should be svg only. Received a file other than svg file format.',
      });
    }

    // upload now
    const responseAfterUpload = await uploadFileToCloudinary(
      fileFromRequest,
      'techStackImages'
    );
    // console.log('response after upload', responseAfterUpload);

    // save entry in the database
    const insertedTechStackImage = await techStackImageModel.create({
      imageName,
      altText,
      widthOfImage,
      category,
      imageUrl: responseAfterUpload.secure_url,
    });

    res.json({
      success: true,
      message:
        'TechStack image uploaded successfully to cloudinary folder- TechStackImages & Details are stored in database',
    });
  } catch (error) {
    console.log('error', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create techSack details',
    });
  }
};
