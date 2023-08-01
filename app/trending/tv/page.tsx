import TVPoster from '@/app/components/TVPoster';
import getTrendingTV from '@/lib/getTrendingTV';

export default async function TrendingTV() {
  const tvs = (await getTrendingTV()).results;

  return (
    <div className="grid gap-16 grid-cols-4">
      {tvs.map((tv) => (
        <TVPoster key={tv.id} tv={tv} />
      ))}
    </div>
  );
}
