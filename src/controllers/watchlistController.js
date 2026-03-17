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

const removeFromWatchlist = async (req, res) => {
  //find watchlist item and verify ownership
  const { id: userId } = req.user;
  const { id: watchlistItemId } = req.params;
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: watchlistItemId },
  });

  if (!watchlistItem) {
    return res.status(404).json({ message: 'Watchlist item not found' });
  }
  if (watchlistItem.userId !== userId) {
    return res
      .status(403)
      .json({ message: 'Not authorized to delete this watchlist item' });
  }
  await prisma.watchlistItem.delete({
    where: { id: watchlistItemId },
  });
  res.status(200).json({
    status: 'success',
    message: 'Watchlist item deleted successfully',
  });
  //ensure only owner can delete
};

const updateWatchlistItem = async (req, res) => {
  const { id: userId } = req.user;
  const { id: watchlistItemId } = req.params;
  const { status, rating, notes } = req.body;

  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: watchlistItemId },
  });

  if (!watchlistItem) {
    return res.status(404).json({ message: 'Watchlist item not found' });
  }

  if (watchlistItem.userId !== userId) {
    return res
      .status(403)
      .json({ message: 'Not authorized to update this watchlist item' });
  }

  const updateData = {};
  if (status !== undefined) updateData.status = status;
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;
  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id: watchlistItemId },
    data: updateData,
  });
  res.status(200).json({
    status: 'success',
    data: { updatedWatchlistItem },
  });
};

export { addToWatchlist, removeFromWatchlist, updateWatchlistItem };
