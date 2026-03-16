import { prisma } from '../config/db.js';

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  const { id: userId } = req.user;

  // Verify if movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const existingInWatchlist = await prisma.watchlistItem.findUnique({
    where: { userId_movieId: { userId: userId, movieId: movieId } },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ message: 'Movie already in watchlist' });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: status || 'PLANNED',
      rating: rating,
      notes: notes,
    },
  });
  res.status(201).json({
    status: 'success',
    data: { watchlistItem },
  });
};

export { addToWatchlist };
