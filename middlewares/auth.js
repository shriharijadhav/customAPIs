const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
  try {
    // console.log('from body', req.body.token);
    // console.log(
    //   'from header',
    //   req.header('Authorization').replace('Bearer ', '')
    // );
    const token =
      req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: 'Token is missing' });
    }

    // verify token
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded token', decodedToken);

      // add this decoded token to request
      req.fetchedUSer = decodedToken;
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: 'Failed to decode token or TOken is invalid',
      });
    }

    // go to next middleware
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Something went wrong while verifying token',
    });
  }
};

// is admin route
exports.isAdmin = (req, res, next) => {
  try {
    if (req.fetchedUSer.role !== 'admin') {
      console.log(req.fetchedUSer.role);
      return res.status(403).json({
        success: false,
        message: 'This is a protected route & will allow access only for Harry',
      });
    }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to access this route',
    });
  }
};




/*

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yLnNocmloYXJpMjEyQGdtYWlsLmNvbSIsImlkIjoiNjRhMTdmNmNjN2IwMDU1MDBmODZkNTczIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg4MzQ5ODk4LCJleHAiOjE2ODgzNTcwOTh9.StIRV2JlQR3fviNly50xzQql_F6m4IBC1cATKsqTWFM
*/
