import GridList from '@/app/_components/GridList';
import MovieCard from '@/app/_components/cards/MovieCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingMovies({ searchParams }: Props) {
  const url = 'trending/movie/week';
  const movies = (await get<ResultType<Movie>>(url, {}, true))?.results;

  if (!movies) {
    throw new Error('Sorry, unable to satisfy the request');
  }

  return (
    <GridList>
      {movies?.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </GridList>
  );
}
