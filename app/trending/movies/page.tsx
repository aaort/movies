import MoviePoster from '@/app/components/MoviePoster';
import getTrendingMovies from '@/lib/getTrendingMovies';

export default async function TrendingMovies() {
  const movies = (await getTrendingMovies()).results;

  return (
    <div className="grid gap-16 grid-cols-4">
      {movies?.map((movie) => (
        <MoviePoster key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
