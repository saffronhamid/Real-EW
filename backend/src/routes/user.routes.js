import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

// Dummy test route
router.get('/', (req, res) => {
  res.json({ message: 'User route works!' });
});

// Register route
router.post('/register', registerUser);

// 🔥 ADD this line below for login route
router.post('/login', loginUser);  // <-- ✅

export default router;
