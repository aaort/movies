import GridList from '@/app/components/GridList';
import TVCard from '@/app/components/cards/TVCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingTV({ searchParams }: Props) {
  const searchText = searchParams.search ?? '';
  const url = searchText ? `search/tv?query=${searchText}` : 'trending/tv/week';
  const tvs = (await get<ResultType<TV>>(url, {}, !searchText))?.results;

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
