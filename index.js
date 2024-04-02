const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
require('dotenv').config();
var cookieParser = require('cookie-parser');

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);
// const myTechStack = require('./routes/techStack.js');

// connect with db
require('./config/dbConnect.js').dbConnect();

// connect with cloudinary
// const cloudinary = require('./config/cloudinary.js');
// cloudinary.cloudinaryConnect();

// const user = require('./routes/user.js');
// app.use('/api/v1', user);

// const newTechStackItem = require('./routes/fileupload.js');
// app.use('/api/v1', newTechStackItem);

// const newTechStackCategory = require('./routes/newTechStackCategory.js');
// app.use('/api/v1', newTechStackCategory);

// const getAllTechStack = require('./routes/getAllTechStack.js');
// app.use('/api/v1', getAllTechStack);

// const newProjectCard = require('./routes/newProjectCard.js');
// app.use('/api/v1', newProjectCard);

// const getAllProjectCards = require('./routes/getAllProjectCards.js');
// app.use('/api/v1', getAllProjectCards);

// const ContactUs = require('./routes/ContactUs.js');
// app.use('/api/v1', ContactUs);

// const newExperience = require('./routes/newExperience.js');
// app.use('/api/v1', newExperience);

// const getAllExperience = require('./routes/getAllExperience.js');
// app.use('/api/v1', getAllExperience);

const getKfcHomePageData = require('./routes/kfcHomePageData.js');
app.use('/api/v1', getKfcHomePageData);

const getKfcMenuDetails = require('./routes/getKfcMenuDetails.js');
app.use('/api/v1', getKfcMenuDetails);


const getPharmEasyHomepageData = require('./routes/getPharmEasyHomepageData.js');
app.use('/api/v1', getPharmEasyHomepageData);

const getPharmEasyBuyProductsData = require('./routes/getPharmEasyBuyProductsData.js');
app.use('/api/v1', getPharmEasyBuyProductsData);

// for resume download

// Serve the static files from the 'public' folder in your React app
app.use(express.static('../public'));

app.get('/resume', (req, res) => {
  // Send the file as an attachment to initiate the download
  res.attachment('resume/Shrihari_Jadhav_Resume.pdf');
  // Replace 'example_file.txt' with the actual file name and extension.

  // Send the file from the 'public' folder
  res.sendFile('resume/Shrihari_Jadhav_Resume.pdf', { root: '../public' });
  // Replace 'example_file.txt' with the actual file name and extension.
});

// for resume download
const PORT_NUMBER = process.env.PORT || 4000;

try {
  app.listen(PORT_NUMBER, () => {
    console.log('server listening on port ' + PORT_NUMBER);
  });
} catch (error) {
  console.log(error.message);
}
