import GridList from '@/app/components/GridList';
import SearchInput from '@/app/components/Search';
import MovieGridCard from '@/app/components/cards/MovieGridCard';
import PersonGridCard from '@/app/components/cards/PersonGridCard';
import TVGridCard from '@/app/components/cards/TVGridCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | undefined | null };
};

type DataType = ResultType<Movie | TV | Person>;

export default async function Search({ searchParams }: Props) {
  const searchText = searchParams.search ?? '';
  const data = (await get<DataType>(`search/multi?query=${searchText}`))
    ?.results;

  const movies: Movie[] | undefined = data?.filter(
    (item): item is Movie => item.media_type === 'movie'
  );
  const tvs: TV[] | undefined = data?.filter(
    (item): item is TV => item.media_type === 'tv'
  );
  const people: Person[] | undefined = data?.filter(
    (item): item is Person => item.media_type === 'person'
  );

  console.log(data);

  return (
    <main className='m-10 space-y-20'>
      <SearchInput />

      {data?.length ? (
        <>
          {movies?.length ? (
            <section className='space-y-10'>
              <h2 className='font-bold text-xl'>Movies</h2>
              <GridList>
                {movies?.map((movie, i) => (
                  <li key={movie.id}>
                    <MovieGridCard movie={movie} index={i} />
                  </li>
                ))}
              </GridList>
            </section>
          ) : null}
          {tvs?.length ? (
            <>
              <hr className='border-slate-400' />
              <section className='space-y-10'>
                <h2 className='font-bold text-xl'>TVs</h2>
                <GridList>
                  {tvs?.map((tv, i) => (
                    <li key={tv.id}>
                      <TVGridCard tv={tv} index={i} />
                    </li>
                  ))}
                </GridList>
              </section>
            </>
          ) : null}
          {people?.length ? (
            <>
              <hr className='border-slate-400' />
              <section className='space-y-10'>
                <h2 className='font-bold text-xl'>People</h2>
                <GridList>
                  {people?.map((person, i) => (
                    <li key={person.id}>
                      <PersonGridCard person={person} index={i} />
                    </li>
                  ))}
                </GridList>
              </section>
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
