import express from 'express';
import { analyzeCareer } from '../controllers/aiController.js';

const router = express.Router();
router.post('/analyze', analyzeCareer);

export default router;