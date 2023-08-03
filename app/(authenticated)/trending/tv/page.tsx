import TVItem from '@/app/components/TVPosterItem';
import getTrendingTV from '@/lib/getTrendingTV';

export default async function TrendingTV() {
  const tvs = (await getTrendingTV()).results;

  return (
    <div className="grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {tvs.map((tv, index) => (
        <TVItem key={tv.id} tv={tv} index={index} />
      ))}
    </div>
  );
}
