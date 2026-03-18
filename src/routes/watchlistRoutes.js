import express from 'express';
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from '../controllers/watchlistController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addToWatchlistSchema } from '../validators/watchlistValidators.js';

const router = express.Router();
router.use(authMiddleware);

router.post(
  '/',
  errorMiddleware,
  validateRequest(addToWatchlistSchema),
  addToWatchlist,
);
router.put(
  '/:id',
  errorMiddleware,
  validateRequest(addToWatchlistSchema),
  updateWatchlistItem,
);
router.delete('/:id', errorMiddleware, removeFromWatchlist);

export default router;
