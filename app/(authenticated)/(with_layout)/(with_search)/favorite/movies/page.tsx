import GridList from '@/app/components/GridList';
import MovieGridCard from '@/app/components/cards/MovieGridCard';
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
        <MovieGridCard key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
