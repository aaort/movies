import GridList from '@/app/_components/GridList';
import Pagination from '@/app/(authenticated)/(with_header)/_components/Pagination';
import MovieCard from '@/app/_components/cards/MovieCard';
import get from '@/lib/api/get';
import type { ResultType } from '@/lib/types';
import type { Movie } from '@/types';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function UpcomingMovies({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const parsedPage = Number(page);

  const url = `movie/upcoming`;
  const data = await get<ResultType<Movie>>(url, {}, true, {
    page: !isNaN(parsedPage) ? page : 1,
  });

  const movies = data?.results;
  const totalPages = data?.total_pages;

  if (!movies) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <section className='flex flex-col gap-y-10'>
      <GridList>
        {movies?.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </GridList>
      <div className='self-end'>
        {!isNaN(parsedPage) && totalPages ? (
          <Pagination page={parsedPage} totalPages={totalPages} />
        ) : null}
      </div>
    </section>
  );
}
