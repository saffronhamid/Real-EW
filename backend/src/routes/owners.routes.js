import { Router } from 'express';
import { createOrUpdateProfile, getProfile } from '../controllers/owners.controller.js';
import { protect, requireRole } from '../middleware/auth.js';


const router = Router();


router.post('/profile', protect, requireRole(['owner']), createOrUpdateProfile);
router.get('/profile', protect, requireRole(['owner']), getProfile);


export default router;