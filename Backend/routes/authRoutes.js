// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the bouncer

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Apply the 'protect' middleware to this route!
router.get('/me', protect, getMe); 

export default router;