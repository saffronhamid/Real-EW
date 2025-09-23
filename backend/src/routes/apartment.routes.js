import express from 'express';
import {
  createApartment,
  getAllApartments,
  getApartmentById,
  deleteApartment,
  getMyApartments,
  verifyApartmentStatus
} from '../controllers/apartment.controller.js';
import { protect, adminOnly } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createApartment);          // POST /api/apartments
router.get('/my', protect, getMyApartments);         
router.get('/', getAllApartments);                   // GET /api/apartments
router.get('/:id', getApartmentById);                // GET /api/apartments/:id
router.delete('/:id', protect, deleteApartment);     // DELETE /api/apartments/:id
router.patch('/:id/verify', protect, adminOnly, verifyApartmentStatus);

export default router;
