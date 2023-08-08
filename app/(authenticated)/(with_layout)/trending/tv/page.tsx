import GridList from '@/app/components/GridList';
import TVGridCard from '@/app/components/cards/TVGridCard';
import get from '@/lib/api/get';

export default async function TrendingTV() {
  const tvs = (await get<ResultType<TV>>(`trending/tv/week`, {}, true))
    ?.results;

  if (!tvs) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <GridList>
      {tvs.map((tv, index) => (
        <TVGridCard key={tv.id} tv={tv} index={index} />
      ))}
    </GridList>
  );
}
