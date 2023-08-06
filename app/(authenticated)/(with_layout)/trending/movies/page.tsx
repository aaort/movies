import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import get from '@/lib/api/get';

export default async function TrendingMovies() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week', {}, true))
    .results;
  const favoriteMovies = (
    await get<ResultType<Movie>>(`account/{}/favorite/movies`, {
      cache: 'no-cache',
    })
  ).results;

  const isFavorite = (movieId: number) => {
    return favoriteMovies.some((favoriteMovie) => favoriteMovie.id === movieId);
  };

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          index={index}
          favorite={isFavorite(movie.id)}
        />
      ))}
    </GridList>
  );
}
