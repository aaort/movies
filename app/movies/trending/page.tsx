'use client';

import MoviePoster from '@/app/components/MoviePoster';
import getTrendingMovies from '@/lib/getTrendingMovies';
import { useEffect, useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const setTrendingMovies = async () => {
      const movies = await getTrendingMovies();
      setMovies(movies.results);
    };
    setTrendingMovies();
  }, []);

  return (
    <main className="grid p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-20 gap-16 grid-cols-4">
      {movies?.map((movie) => (
        <MoviePoster key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
