// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Owner from '../models/OwnerProfile.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded payload:', decoded);  // Diagnostic log

    if (!decoded?.id) {
      return res.status(401).json({ message: 'Invalid token: No ID in payload' });
    }

    let user = await User.findById(decoded.id).select('-password');
    if (!user) {
      user = await Owner.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user?.role || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};
