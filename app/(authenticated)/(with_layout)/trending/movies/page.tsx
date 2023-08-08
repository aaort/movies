import GridList from '@/app/components/GridList';
import MovieItem from '@/app/components/MovieItem';
import get from '@/lib/api/get';

export default async function TrendingMovies() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week', {}, true))
    ?.results;

  if (!movies) {
    throw new Error('Sorry, unable to satisfy the request');
  }

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieItem key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
