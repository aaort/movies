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
  });

  useEffect(() => {
    const setTrendingMovies = async () => {
      const movies = await getTrendingMovies();
      setMovies(movies.results);
    };
    setTrendingMovies();
  }, []);

  return (
    <main className="grid p-10 gap-16 grid-cols-4">
      {movies?.map((movie) => (
        <MoviePoster key={movie.id} movie={movie} />
      ))}
    </main>
  );
}
