import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const movies = [
    {
      title: 'The Shawshank Redemption',
      overview:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      releaseYear: 1994,
      genres: ['Drama', 'Crime'],
      director: 'Frank Darabont',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    },
    {
      title: 'The Godfather',
      overview:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      releaseYear: 1972,
      genres: ['Crime', 'Drama'],
      director: 'Francis Ford Coppola',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    },
    {
      title: 'The Dark Knight',
      overview:
        'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      releaseYear: 2008,
      genres: ['Action', 'Crime', 'Drama'],
      director: 'Christopher Nolan',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      title: 'Pulp Fiction',
      overview:
        'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
      releaseYear: 1994,
      genres: ['Crime', 'Drama'],
      director: 'Quentin Tarantino',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    },
    {
      title: 'Forrest Gump',
      overview:
        'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.',
      releaseYear: 1994,
      genres: ['Drama', 'Romance'],
      director: 'Robert Zemeckis',
      posterUrl:
        'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    },
  ];

  for (const movie of movies) {
    console.log(`Creating movie: ${movie.title}`);
    await prisma.movie.create({
      data: movie,
    });
  }
  console.log('Movies created');
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
