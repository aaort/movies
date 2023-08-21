import GridList from '@/app/_components/GridList';
import MovieCard from '@/app/_components/cards/MovieCard';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';

export default async function WatchlistPage() {
  const movies = (await get<ResultType<Movie>>('account/{}/watchlist/movies'))
    ?.results;
  const tvs = (await get<ResultType<TV>>('account/{}/watchlist/tv'))?.results;

  return (
    <div className='space-y-20 [&_h2]:text-xl'>
      {movies?.length ? (
        <section className='space-y-10'>
          <h2>Movies</h2>
          <GridList>
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </GridList>
        </section>
      ) : null}

      {tvs?.length ? (
        <>
          <hr />
          <section className='space-y-10'>
            <h2>TVs</h2>
            <GridList>
              {tvs.map((tv, i) => (
                <TVCard key={tv.id} tv={tv} index={i} />
              ))}
            </GridList>
          </section>
        </>
      ) : null}
    </div>
  );
}
