import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import getFavoriteMovies from '@/lib/api/getFavoriteMovies';
import getTrendingMovies from '@/lib/api/getTrendingMovies';

export default async function TrendingMovies() {
  const movies = (await getTrendingMovies()).results;
  const favoriteMovies = (await getFavoriteMovies()).results;

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
