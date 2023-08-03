import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import getTrendingMovies from '@/lib/getTrendingMovies';

export default async function TrendingMovies() {
  const movies = (await getTrendingMovies()).results;

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
