import Back from '@/app/_components/Back';
import ExternalLinks from '@/app/_components/ExternalLinks';
import ReadMore from '@/app/_components/ReadMore';
import MovieCard from '@/app/_components/cards/MovieCard';
import TVCard from '@/app/_components/cards/TVCard';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import getGenderByNumber from '@/lib/helpers/getGenderByNumber';
import { type Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { personId: string };
};

export async function generateMetadata({
  params: { personId },
}: Props): Promise<Metadata> {
  const person = await get<PersonDetails>(`person/${personId}`);

  return {
    title: person ? person.name : 'person',
    description: person && `Details page for ${person.name}`,
  };
}

export const dynamicParams = true;

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

  const credits: ((Movie | TV) & { type: string })[] = [
    ...(movies?.cast.map((movie) => ({ ...movie, type: 'movie' })) ?? []),
    ...(tvs?.cast.map((tv) => ({ ...tv, type: 'tv' })) ?? []),
  ];

  return (
    <>
      <aside>
        <Back classes='absolute top-2 left-2' />
      </aside>
      <main>
        <div className='flex gap-10 page-space-m overflow-hidden'>
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
              <dl className='flex flex-col gap-8'>
                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Known for</dd>
                  </b>
                  <dt className='text-primary-700'>
                    {person.known_for_department}
                  </dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Gender</dd>
                  </b>
                  <dt className='text-primary-700'>
                    {getGenderByNumber(person.gender)}
                  </dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Birthday</dd>
                  </b>
                  <dt className='text-primary-700'>{person.birthday}</dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Place of birth</dd>
                  </b>
                  <dt className='text-primary-700'>{person.place_of_birth}</dt>
                </div>

                <div className='flex flex-col gap-1'>
                  <b>
                    <dd>Also known as</dd>
                  </b>
                  <dt className='flex flex-col text-primary-700'>
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
              <dd className='break-normal'>
                <ReadMore>{person.biography}</ReadMore>
              </dd>
            </dl>

            <section className='overflow-hidden max-w-full'>
              <h3 className='font-bold text-lg mb-2'>Known for</h3>
              <ul className='max-w-full inline-flex gap-10 overflow-x-auto pb-10 text-white'>
                {credits?.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className='min-w-[50vw] md:min-w-[30vw] lg:min-w-[20vw]'
                    >
                      {item.type === 'movie' ? (
                        <MovieCard movie={item as Movie} index={i} />
                      ) : (
                        <TVCard tv={item as TV} index={i} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </section>
        </div>
      </main>
    </>
  );
}
