import getUpcomingMovies from '@/lib/getUpcomingMovies';
import MovieItem from '@/app/components/MovieItem';

export default async function UpcomingMovies() {
  const movies = (await getUpcomingMovies()).results;

  return (
    <div className="grid gap-16 grid-cols-4 ">
      {movies?.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
