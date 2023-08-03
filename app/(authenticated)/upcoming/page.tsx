import getUpcomingMovies from '@/lib/getUpcomingMovies';
import MovieItem from '@/app/components/MovieItem';

export default async function UpcomingMovies() {
  const movies = (await getUpcomingMovies()).results;

  return (
    <div className="grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {movies?.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
