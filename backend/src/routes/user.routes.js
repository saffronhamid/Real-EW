import express from 'express';
import { registerUser } from '../controllers/user.controller.js';
const router = express.Router();

// Basic dummy route for now
router.get('/', (req, res) => {
  res.json({ message: 'User route works!' });
});
router.post('/register', registerUser);

export default router;
