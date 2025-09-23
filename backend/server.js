import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import ownerRoutes from './src/routes/owners.routes.js'; // ✅ Step 3 route added
import apartmentRoutes from './src/routes/apartment.routes.js';


dotenv.config();         // 1) load env
connectDB();             // 2) connect Mongo

const app = express();   // 3) create app

// 4) middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use('/api/apartments', apartmentRoutes);


// 5) routes
app.get('/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/owners', ownerRoutes); // ✅ NEW — Owner profile routes

// 6) start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
