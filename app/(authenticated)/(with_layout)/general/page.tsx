import MovieGridCard from '@/app/components/cards/MovieGridCard';
import get from '@/lib/api/get';

export default async function GeneralPage() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week'))?.results;

  return (
    <div className='space-y-10'>
      <section>
        <h2 className='mb-8 text-xl'>Trending</h2>
        <ul className='flex gap-14 overflow-x-auto'>
          {movies?.map((movie, i) => (
            <MovieGridCard key={movie.id} movie={movie} index={i} />
          ))}
        </ul>
      </section>

      <section>
        <h2></h2>
      </section>
    </div>
  );
}
