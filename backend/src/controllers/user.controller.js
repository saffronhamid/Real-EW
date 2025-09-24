import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

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

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Login failed' });
  }
};
