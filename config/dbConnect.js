const mongoose = require('mongoose');

require('dotenv').config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('db connection  established');
    })
    .catch((err) => {
      console.log('Error while connecting to Mongodb database', err.message);
      process.exit(1);
    });
};
