'use client';

import getTrendingMovies from '@/lib/getTrendingMovies';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import MoviePoster from './components/MoviePoster';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    if (!sessionStorage.getItem('session_id')) {
      redirect('/login');
    }
  }, []);

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
