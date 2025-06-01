const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: 'Please login to access this resource' });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: `Role ${req.user?.role || 'guest'} is not allowed` });
    }
    next();
  };
};