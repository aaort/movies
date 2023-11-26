import GridList from '@/app/_components/GridList';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';
import { MAX_PAGE } from '@/lib/constants';
import type { ResultType } from '@/lib/types';
import type { TV } from '@/types';
import Pagination from '../../_components/Pagination';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingTV({ searchParams }: Props) {
  const _page = searchParams.page || '';
  const page = Number(_page) || 1;

  const url = `trending/tv/week?page=${page}`;
  const data = await get<ResultType<TV>>(url, {}, true);

  const tvs = data?.results;

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
        {!isNaN(page) && MAX_PAGE ? (
          <Pagination page={page} totalPages={MAX_PAGE} />
        ) : null}
      </div>
    </section>
  );
}
