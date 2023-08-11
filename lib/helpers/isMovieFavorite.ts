import get from '../api/get';

export default async function isMovieFavorite(movieId: number) {
  const favoriteMovies = (
    await get<ResultType<Movie>>(`account/{}/favorite/movies`, {
      cache: 'no-cache',
    })
  )?.results;

  return !!favoriteMovies?.some(
    (favoriteMovie) => favoriteMovie.id === movieId
  );
}
