const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userModel = require('../models/UserModel');
const UserModel = require('../models/UserModel');

require('dotenv').config();

// signup route
exports.signup = async (req, res) => {
  try {
    // get name , email password & role from request body
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await userModel.findOne({ email: email });
    // console.log(existingUser);
    // console.log(existingUser);
    // if user already exists
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // if user is not registered already then signup

    // 1 secure the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Unable to encrypt password',
      });
    }

    // create an entry to db
    const insertedUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to register user. Please try again later',
    });
  }
};

// login route
exports.login = async (req, res) => {
  try {
    // get the email and password from user request
    const { email, password } = req.body;

    // check if password or email is null
    if (!email || !password) {
      return res
        .status(500)
        .json({ success: false, message: 'Password or email is null' });
    }
    // check if the user has account in DB
    const fetchedUser = await UserModel.findOne({ email: email });

    //   if there is no user in with with received email ..return
    if (!fetchedUser) {
      return res.status(500).json({
        success: false,
        message: 'No user registered with this email.',
      });
    }

    const payload = {
      email: fetchedUser.email,
      id: fetchedUser._id,
      role: fetchedUser.role,
    };
    // if user exists check password is matching or not & generate JWT token
    if (await bcrypt.compare(password, fetchedUser.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      //   fetchedUser = fetchedUser.toObject();
      //   add this token in fetched user
      fetchedUser.token = token;
      fetchedUser.password = null;

      //   create options object for cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie('token', token, options).json({
        success: true,
        message: 'User logged in successfully.',
        fetchedUser,
        token,
      });
    } else {
      return res
        .status(403)
        .json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to login' });
  }
};
