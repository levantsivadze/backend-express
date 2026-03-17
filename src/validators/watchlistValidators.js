import { z } from 'zod';

const addToWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {
      error: () => ({
        message:
          'Status must be one of the following: PLANNED, WATCHING, COMPLETED, DROPPED',
      }),
    })
    .optional(),
  rating: z.coerce
    .number('Rating must be a number between 1 and 5')
    .int('Rating must be an integer')
    .min(1, 'Rating must be between 1 and 10')
    .max(10, 'Rating must be between 1 and 10')
    .optional(),
  notes: z.string().optional(),
});

export { addToWatchlistSchema };

const updateWatchlistItemSchema = z.object({
  status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED']).optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
});
