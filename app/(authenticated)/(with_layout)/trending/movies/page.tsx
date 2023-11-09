import GridList from '@/app/_components/GridList';
import Pagination from '@/app/_components/Pagination';
import MovieCard from '@/app/_components/cards/MovieCard';
import get from '@/lib/api/get';
import { MAX_PAGE } from '@/lib/constants';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingMovies({ searchParams }: Props) {
  const _page = searchParams.page || '';
  const page = Number(_page) || 1;

  const url = `trending/movie/week?page=${page}`;
  const data = await get<ResultType<Movie>>(url, {}, true);

  const movies = data?.results;

  if (!movies) {
    throw new Error('Sorry, unable to satisfy the request');
  }

  return (
    <section className='flex flex-col gap-y-10'>
      <GridList>
        {movies?.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </GridList>

      <div className='self-end'>
        {!isNaN(page) && MAX_PAGE ? (
          <Pagination page={page} totalPages={MAX_PAGE} />
        ) : null}
      </div>
    </section>
  );
}
