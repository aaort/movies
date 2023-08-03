import getUpcomingMovies from '@/lib/getUpcomingMovies';
import MovieItem from '@/app/components/MovieItem';
import GridList from '@/app/components/GridList';

export default async function UpcomingMovies() {
  const movies = (await getUpcomingMovies()).results;

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
