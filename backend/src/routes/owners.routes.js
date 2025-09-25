// backend/src/routes/owners.routes.js
import express from 'express';
import {
  createOrUpdateProfile,
  getProfile,
  googleLoginOwner, // ✅ add this import
} from '../controllers/owners.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/google-login', googleLoginOwner); // ✅ now works
router.post('/profile', createOrUpdateProfile);
router.get('/profile', getProfile);

export default router;
