import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

config();
connectDB();

const app = express();

// Body Parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (error) => {
  console.error('Unhandled rejection', error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught exception', error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received. Shutting down gracefully');
  server.close();
  await disconnectDB();
  process.exit(0);
});
