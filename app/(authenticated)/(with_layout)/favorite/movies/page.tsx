import GridList from '@/app/_components/GridList';
import MovieCard from '@/app/_components/cards/MovieCard';
import get from '@/lib/api/get';

export default async function FavoriteMovies() {
  const movies = (
    await get<ResultType<Movie>>(`account/{}/favorite/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  if (!movies) {
    throw new Error('Sorry, request cannot be satisfied');
  }

  return (
    <GridList>
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
