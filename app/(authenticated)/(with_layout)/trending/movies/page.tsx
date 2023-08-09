import GridList from '@/app/components/GridList';
import MovieGridCard from '@/app/components/cards/MovieGridCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingMovies({ searchParams }: Props) {
  const movies = searchParams.search
    ? (
        await get<ResultType<Movie>>(
          `search/movie?query=${searchParams.search}`
        )
      )?.results
    : (await get<ResultType<Movie>>('trending/movie/week', {}, true))?.results;

  if (!movies) {
    throw new Error('Sorry, unable to satisfy the request');
  }

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieGridCard key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
