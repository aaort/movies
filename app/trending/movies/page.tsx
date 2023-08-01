import MovieItem from '@/app/components/MovieItem';
import getTrendingMovies from '@/lib/getTrendingMovies';

export default async function TrendingMovies() {
  const movies = (await getTrendingMovies()).results;

  return (
    <div className="grid gap-16 grid-cols-4">
      {movies?.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
