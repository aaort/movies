import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import getUpcomingMovies from '@/lib/api/getUpcomingMovies';

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
