import MovieItem from '@/app/components/MovieItem';
import getTrendingMovies from '@/lib/getTrendingMovies';

export default async function TrendingMovies() {
  const movies = (await getTrendingMovies()).results;

  return (
    <div className="grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {movies?.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
