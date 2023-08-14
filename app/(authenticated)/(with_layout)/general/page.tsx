import MovieCard from '@/app/_components/cards/MovieCard';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';

export default async function GeneralPage() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week'))?.results;
  const tvs = (await get<ResultType<TV>>('trending/tv/week'))?.results;

  return (
    <div className='space-y-10'>
      <section>
        <h2 className='mb-8 text-xl'>Trending - Movies</h2>
        <ul className='flex gap-14 overflow-x-auto pb-8'>
          {movies?.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </ul>
      </section>

      <section>
        <h2 className='mb-8 text-xl'>Trending - TVs</h2>
        <ul className='flex gap-14 overflow-x-auto pb-8'>
          {tvs?.map((tv, i) => (
            <TVCard key={tv.id} tv={tv} index={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}
