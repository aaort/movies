import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import get from '@/lib/api/get';

export default async function FavoriteMovies() {
  const movies = (
    await get<ResultType<Movie>>(`account/{}/favorite/movies`, {
      cache: 'no-cache',
    })
  ).results;

  return (
    <GridList>
      {movies.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} favorite={true} />
      ))}
    </GridList>
  );
}
