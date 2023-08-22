import Back from '@/app/_components/Back';
import GridList from '@/app/_components/GridList';
import SearchInput from '@/app/_components/Search';
import MovieCard from '@/app/_components/cards/MovieCard';
import PersonCard from '@/app/_components/cards/PersonCard';
import TVCard from '@/app/_components/cards/TVCard';
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

  const movieCount = movies?.length ?? 0;
  const tvCount = tvs?.length ?? 0;
  const peopleCount = people?.length ?? 0;

  return (
    <>
      <aside className='flex justify-between p-4 items-start'>
        <Back classes='text-black' title='General' />
        <div className='flex flex-col gap-4 bg-primary-200 px-4 py-2 rounded-md'>
          <dl className='flex gap-1'>
            <dt>Movies:</dt>
            <dd className='text-primary-500'>{movieCount}</dd>
          </dl>

          <dl className='flex gap-1'>
            <dt>TVs:</dt>
            <dd className='text-primary-500'>{tvCount}</dd>
          </dl>

          <dl className='flex gap-1'>
            <dt>People:</dt>
            <dd className='text-primary-500'>{peopleCount}</dd>
          </dl>
        </div>
      </aside>
      <main className='my-4 mb-20 page-space-p py-0 space-y-20'>
        <div className='flex flex-col gap-4 text-xl'>
          <SearchInput />
        </div>

        {data?.length ? (
          <>
            {/* Movies grid list section */}
            {movies?.length ? (
              <section className='space-y-10'>
                <h2 className='font-bold text-xl'>Movies</h2>
                <GridList>
                  {movies?.map((movie, i) => (
                    <li key={movie.id}>
                      <MovieCard movie={movie} index={i} />
                    </li>
                  ))}
                </GridList>
              </section>
            ) : null}
            {/* TVs grid list section */}
            {tvs?.length ? (
              <>
                <hr />
                <section className='space-y-10'>
                  <h2 className='font-bold text-xl'>TVs</h2>
                  <GridList>
                    {tvs?.map((tv, i) => (
                      <li key={tv.id}>
                        <TVCard tv={tv} index={i} />
                      </li>
                    ))}
                  </GridList>
                </section>
              </>
            ) : null}
            {/* People grid list section */}
            {people?.length ? (
              <>
                <hr />
                <section className='space-y-10'>
                  <h2 className='font-bold text-xl'>People</h2>
                  <GridList>
                    {people?.map((person, i) => (
                      <li key={person.id}>
                        <PersonCard person={person} index={i} />
                      </li>
                    ))}
                  </GridList>
                </section>
              </>
            ) : null}
          </>
        ) : null}
      </main>
    </>
  );
}
