import MovieCard from '@/app/_components/cards/MovieCard';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';
import Link from 'next/link';

export default async function GeneralPage() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week'))?.results;
  const tvs = (await get<ResultType<TV>>('trending/tv/week'))?.results;

  return (
    <div className='space-y-10'>
      <section>
        <div className='flex justify-between'>
          <h2 className='mb-8 text-xl'>Trending - Movies</h2>
          <Link href='/trending/movies' className='underline'>
            View all
          </Link>
        </div>
        <ul className='flex gap-4 md:gap-8 overflow-x-auto pb-8'>
          {movies?.map((movie, i) => (
            <li
              key={movie.id}
              className='min-w-[50vw] md:min-w-[30vw] lg:min-w-[20vw]'
            >
              <MovieCard movie={movie} index={i} />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className='flex justify-between'>
          <h2 className='mb-8 text-xl'>Trending - TVs</h2>
          <Link href='/trending/tvs' className='underline'>
            View all
          </Link>
        </div>
        <ul className='flex gap-4 md:gap-8 overflow-x-auto pb-8'>
          {tvs?.map((tv, i) => (
            <li
              key={tv.id}
              className='min-w-[50vw] md:min-w-[30vw] lg:min-w-[20vw]'
            >
              <TVCard tv={tv} index={i} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
