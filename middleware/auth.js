const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get the sent token from header
  const token = req.header('x-auth-token');

  // check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); // decode token
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
