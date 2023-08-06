import GridList from '@/app/components/GridList';
import TVItem from '@/app/components/TVPosterItem';
import get from '@/lib/api/get';

export default async function TrendingTV() {
  const tvs = (await get<ResultType<TV>>(`trending/tv/week`, {}, true)).results;

  return (
    <GridList>
      {tvs.map((tv, index) => (
        <TVItem key={tv.id} tv={tv} index={index} />
      ))}
    </GridList>
  );
}
