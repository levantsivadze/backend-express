import { prisma } from '../config/db.js';

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { movies },
    });
  } catch (error) {
    console.error('Get all movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json({
      status: 'success',
      data: { movie },
    });
  } catch (error) {
    console.error('Get movie by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, description, releaseYear, genre, director, posterUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        releaseYear,
        genre,
        director,
        posterUrl,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { movie },
    });
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, releaseYear, genre, director, posterUrl } = req.body;

    const existingMovie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movie = await prisma.movie.update({
      where: { id },
      data: {
        title,
        description,
        releaseYear,
        genre,
        director,
        posterUrl,
      },
    });

    res.json({
      status: 'success',
      data: { movie },
    });
  } catch (error) {
    console.error('Update movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const existingMovie = await prisma.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    await prisma.movie.delete({
      where: { id },
    });

    res.json({
      status: 'success',
      message: 'Movie deleted successfully',
    });
  } catch (error) {
    console.error('Delete movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
