import GridList from '@/app/_components/GridList';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingTV({ searchParams }: Props) {
  const url = 'trending/tv/week';
  const tvs = (await get<ResultType<TV>>(url, {}, true))?.results;

  if (!tvs) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <GridList>
      {tvs.map((tv, index) => (
        <TVCard key={tv.id} tv={tv} index={index} />
      ))}
    </GridList>
  );
}
