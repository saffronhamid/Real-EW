import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin: isAdmin || false, // ✅ allow admin creation
    });

    // generate token
    const token = jwt.sign({ _id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
};
