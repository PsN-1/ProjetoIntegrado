const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.SECRET); 
    req.userData = { storeName: decodedToken.storeName };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed1!', 403);
    return next(error);
  }
};