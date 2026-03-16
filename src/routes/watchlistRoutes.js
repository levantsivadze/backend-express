import express from 'express';
import { addToWatchlist } from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addToWatchlist);

export default router;
