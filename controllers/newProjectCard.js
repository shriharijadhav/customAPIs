require('dotenv').config();
const projectCardModel = require('../models/projectCardModel');

const cloudinary = require('cloudinary').v2;

//
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.newProjectCard = async (req, res) => {
  try {
    const {
      projectName,
      projectLogoAltText,
      projectDescription,
      bgColorClass,
      ringColorClass,
      textColorClass,
      projectHostedLink,
    } = req.body;

    const logoFileFromRequest = req.files.logoFile;

    //   check if same project name exists in database
    const fetchedProject = await projectCardModel.findOne({
      projectName: projectName,
    });

    if (fetchedProject) {
      res.status(403).json({
        success: false,
        message:
          'Project name already exists. Please provide new project name.',
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
      'projectLogos'
    );

    //   insert details along with secure url in database
    const insertedProjectCard = await projectCardModel.create({
      projectName,
      projectLogoAltText,
      projectDescription,
      bgColorClass,
      ringColorClass,
      textColorClass,
      projectHostedLink,
      projectLogoUrl: responseAfterUpload.secure_url,
    });

    res.json({
      success: true,
      message:
        'Project logo has been uploaded to Cloudinary  & Project card Details are stored in database',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while new project card',
    });
  }
};
