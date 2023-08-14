import ExternalLinks from '@/app/components/ExternalLinks';
import MovieCard from '@/app/components/cards/MovieCard';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import getGenderByNumber from '@/lib/helpers/getGenderByNumber';
import Image from 'next/image';

type Props = {
  params: { personId: string };
};

export default async function PersonPage({ params: { personId } }: Props) {
  const person = await get<PersonDetails>(`person/${personId}`);

  if (!person) {
    throw new Error('Sorry, request cannot be satisfied');
  }

  const movies = await get<{ id: number; cast: Movie[] }>(
    `person/${person.id}/movie_credits`
  );
  const tvs = await get<{ id: number; cast: TV[]; crew: TV[] }>(
    `person/${person.id}/tv_credits`
  );

  const avatarPath = generateImageUrlByFilename(person?.profile_path);

  console.log(movies);

  return (
    <main>
      <section>
        <div className='flex gap-10 mx-2 md:mx-4 lg:mx-10 my-10 overflow-hidden'>
          <div className='flex-1 space-y-10'>
            <div className='relative w-full min-w-[25vw] max-w-[40vw] aspect-[1/1.5] rounded-md overflow-clip drop-shadow-xl'>
              <Image src={avatarPath} alt={`${person.name}'s avatar`} fill />
            </div>
            <ExternalLinks
              path={`person/${person.id}/external_ids`}
              axis='horizontal'
            />
            <section>
              <h3 className='mb-10 font-bold text-xl'>Personal Info</h3>
              <dl className='flex flex-col gap-10'>
                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Known for</dd>
                  </b>
                  <dt className='text-slate-700'>
                    {person.known_for_department}
                  </dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Gender</dd>
                  </b>
                  <dt className='text-slate-700'>
                    {getGenderByNumber(person.gender)}
                  </dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Birthday</dd>
                  </b>
                  <dt className='text-slate-700'>{person.birthday}</dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Place of birth</dd>
                  </b>
                  <dt className='text-slate-700'>{person.place_of_birth}</dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Also known as</dd>
                  </b>
                  <dt className='flex flex-col text-slate-700'>
                    {person.also_known_as.map((value, i) => (
                      <span key={i}>{value} </span>
                    ))}
                  </dt>
                </div>
              </dl>
            </section>
          </div>
          <section className='flex-3 space-y-10 max-w-full overflow-hidden'>
            <h1>{person.name}</h1>
            <dl>
              <dt className='font-bold text-lg mb-2'>Biography</dt>
              <dd className='break-normal'>{person.biography}</dd>
            </dl>

            <section className='overflow-hidden max-w-full'>
              <h3 className='font-bold text-xl mb-2'>Known for</h3>
              <ul className='max-w-full inline-flex gap-10 overflow-x-auto pb-10'>
                {movies?.cast?.map((movie, i) => (
                  <li key={i}>
                    <MovieCard movie={movie} index={i} />
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      </section>
    </main>
  );
}
