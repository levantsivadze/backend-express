import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

export default router;
