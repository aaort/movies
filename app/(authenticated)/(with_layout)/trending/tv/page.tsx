import GridList from '@/app/components/GridList';
import TVItem from '@/app/components/TVPosterItem';
import getTrendingTV from '@/lib/api/getTrendingTV';

export default async function TrendingTV() {
  const tvs = (await getTrendingTV()).results;

  return (
    <GridList>
      {tvs.map((tv, index) => (
        <TVItem key={tv.id} tv={tv} index={index} />
      ))}
    </GridList>
  );
}
