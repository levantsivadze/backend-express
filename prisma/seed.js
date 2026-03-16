import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
    },
  });

  console.log('Users created:', { user1, user2 });

  const movies = [
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      releaseYear: 1994,
      genre: 'Drama',
      director: 'Frank Darabont',
      posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    },
    {
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      releaseYear: 1972,
      genre: 'Crime',
      director: 'Francis Ford Coppola',
      posterUrl: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      releaseYear: 2008,
      genre: 'Action',
      director: 'Christopher Nolan',
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
      releaseYear: 1994,
      genre: 'Crime',
      director: 'Quentin Tarantino',
      posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    },
    {
      title: 'Forrest Gump',
      description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.',
      releaseYear: 1994,
      genre: 'Drama',
      director: 'Robert Zemeckis',
      posterUrl: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    },
  ];

  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { title: movie.title },
      update: {},
      create: movie,
    });
  }

  console.log('Movies created');

  const allMovies = await prisma.movie.findMany();
  
  if (allMovies.length >= 2) {
    await prisma.watchlistItem.upsert({
      where: {
        userId_movieId: {
          userId: user1.id,
          movieId: allMovies[0].id,
        },
      },
      update: {},
      create: {
        userId: user1.id,
        movieId: allMovies[0].id,
        status: 'COMPLETED',
        rating: 5,
        notes: 'Amazing movie!',
      },
    });

    await prisma.watchlistItem.upsert({
      where: {
        userId_movieId: {
          userId: user1.id,
          movieId: allMovies[1].id,
        },
      },
      update: {},
      create: {
        userId: user1.id,
        movieId: allMovies[1].id,
        status: 'PLANNED',
      },
    });
  }

  console.log('Watchlist items created');
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
