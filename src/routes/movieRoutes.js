import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  createMovieSchema,
  updateMovieSchema,
} from '../validators/movieValidator.js';
import { errorMiddleware } from '../middleware/errorMiddleware.js';

const router = express.Router();
router.use(errorMiddleware);

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', validateRequest(createMovieSchema), createMovie);
router.put('/:id', validateRequest(updateMovieSchema), updateMovie);
router.delete('/:id', deleteMovie);

export default router;
