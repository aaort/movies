import GridList from '@/app/_components/GridList';
import Pagination from '@/app/_components/Pagination';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingTV({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const parsedPage = Number(page);

  const url = `trending/tv/week?page=${!isNaN(parsedPage) ? page : 1}`;
  const data = await get<ResultType<TV>>(url, {}, true);

  const tvs = data?.results;
  const totalPages = data?.total_pages;

  if (!tvs) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <section className='flex flex-col gap-y-10'>
      <GridList>
        {tvs.map((tv, index) => (
          <TVCard key={tv.id} tv={tv} index={index} />
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
