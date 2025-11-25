
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Check for token in cookies (Preferred for security)
  if (req.cookies.token) {
    token = req.cookies.token;
  } 
  // 2. Fallback to Authorization header (Bearer token)
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, vous devez être connecté.' });
  }

  try {
    // 3. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Check if user still exists
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
        return res.status(401).json({ message: 'Le propriétaire de ce token n\'existe plus.' });
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    // Clear invalid cookie if present
    res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
    return res.status(401).json({ message: 'Session invalide ou expirée.' });
  }
});

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Accès refusé : réservé aux administrateurs.' });
  }
};
