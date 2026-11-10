const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isMemory } = require('../config/db');

async function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    // Demo (memory) mode: serverless instances can restart and forget users — trust the signed token instead
    if (!user && isMemory) user = { id: decoded.id, name: decoded.name, email: decoded.email, role: decoded.role };
    if (!user) return res.status(401).json({ message: 'User no longer exists' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
}

module.exports = { protect, adminOnly };
