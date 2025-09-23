import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import Owner from '../models/OwnerProfile.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded ID:', decoded.id);
const user = await User.findById(decoded.id).select('-password');
console.log('User found:', user);
const owner = await Owner.findById(decoded.id).select('-password');
console.log('Owner found:', owner);


    req.user = user || owner;
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
export const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

