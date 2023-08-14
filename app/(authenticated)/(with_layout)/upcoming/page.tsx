import GridList from '@/app/components/GridList';
import MovieCard from '@/app/components/cards/MovieCard';
import get from '@/lib/api/get';

export default async function UpcomingMovies() {
  const movies = (await get<ResultType<Movie>>('/movie/upcoming'))?.results;

  if (!movies) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
