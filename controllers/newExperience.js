require('dotenv').config();
const experienceModel = require('../models/experienceModel');

const cloudinary = require('cloudinary').v2;

//
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.newExperience = async (req, res) => {
  try {
    const {
        designation,
        companyName,
        periodOfService,
        bgColorClass,
        ringColorClass,
        textColorClass,
     } = req.body;

    const logoFileFromRequest = req.files.logoFile;

    //   check if same project name exists in database
    const fetchedExperience = await experienceModel.findOne({
        companyName: companyName,
    });

    if (fetchedExperience) {
      res.status(403).json({
        success: false,
        message:
          'Experiences already exist in database',
      });
      return;
    }

    // validate if the techStack image is svg or not
    const supportedFileTypes = ['svg', 'png', 'jpg', 'jpeg'];
    const fileTypeOfReceivedFile = logoFileFromRequest.name
      .split('.')[1]
      .toLowerCase();

    // console.log(supportedFileTypes.includes(fileTypeOfReceivedFile));
    if (!supportedFileTypes.includes(fileTypeOfReceivedFile)) {
      res.status(500).json({
        success: false,
        message:
          'FIle format is not supported for project logo. Please select either png,jpg,jpeg or svg file',
      });
    }
    // upload now to project logo folder
    const responseAfterUpload = await uploadFileToCloudinary(
      logoFileFromRequest,
      'companyLogos'
    );

    //   insert details along with secure url in database
    const insertedExperience = await experienceModel.create({
      designation,
      companyName,
      companyLogoUrl: responseAfterUpload.secure_url,
      periodOfService,
      bgColorClass,
      ringColorClass,
      textColorClass,
     });

    res.json({
      success: true,
      message:
        'Company logo has been uploaded to Cloudinary  & Experience Details are stored in database',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new project card',
    });
  }
};
