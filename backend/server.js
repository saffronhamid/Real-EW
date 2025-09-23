import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './src/config/db.js';

import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import ownerRoutes from './src/routes/owners.routes.js';
import apartmentRoutes from './src/routes/apartment.routes.js';

dotenv.config();         
connectDB();             

const app = express();   

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

// Routes
app.use('/api/auth', authRoutes);            // ✅ Login/Signup routes like /api/auth/login
app.use('/api/users', userRoutes);           // General user routes
app.use('/api/owners', ownerRoutes);         // Owner-related routes
app.use('/api/apartments', apartmentRoutes); // Apartment routes

app.get('/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development', time: new Date().toISOString() });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
