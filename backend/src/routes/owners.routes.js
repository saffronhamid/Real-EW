// File: backend/src/routes/owners.routes.js

import express from 'express';
import { createOrUpdateProfile } from '../controllers/owners.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createOrUpdateProfile);

export default router;
