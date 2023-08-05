import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import getFavoriteMovies from '@/lib/api/getFavoriteMovies';

export default async function FavoriteMovies() {
  const movies = (await getFavoriteMovies()).results;

  return (
    <GridList>
      {movies.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} favorite={true} />
      ))}
    </GridList>
  );
}
