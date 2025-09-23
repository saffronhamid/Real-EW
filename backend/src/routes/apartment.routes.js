import express from 'express';
import { createApartment } from '../controllers/apartment.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createApartment);

export default router;
