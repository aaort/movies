import Back from '@/app/_components/Back';
import ExternalLinks from '@/app/_components/ExternalLinks';
import ReadMore from '@/app/_components/ReadMore';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import { Metadata } from 'next';
import Image from 'next/image';
import TrailerPlayer from '../../_components/TrailerPlayer';
import Cast from '../../sections/Cast';
import Reviews from '../../sections/Reviews';

type Props = {
  params: { tvId: string };
};

export async function generateMetadata({
  params: { tvId },
}: Props): Promise<Metadata> {
  const movie = await get<TVDetails>(`tv/${tvId}`);

  return {
    title: movie ? movie.original_name : 'TV series',
    description: movie
      ? `Details page for ${movie.original_name} TV series`
      : '',
  };
}

export async function generateStaticParams() {
  const tvs = (await get<ResultType<TV>>('trending/tv/week', {}, true))
    ?.results;

  return tvs ? tvs.map((tv) => ({ tvId: `${tv.id}` })) : [];
}

export const dynamicParams = true;

export default async function TVPage({ params: { tvId } }: Props) {
  const tv = await get<TVDetails>(`tv/${tvId}`);
  const videos = (await get<ResultType<Video>>(`tv/${tvId}/videos`))?.results;

  if (!tv) {
    throw new Error('Sorry, unable to find details');
  }

  const imagePaths = {
    backdrop: generateImageUrlByFilename(tv.backdrop_path),
    poster: generateImageUrlByFilename(tv.poster_path),
  };

  const trailer = videos?.find((video) => video.type === 'Trailer');
  const creators = tv.created_by;

  return (
    <>
      <aside>
        <Back classes='text-white absolute left-2 top-2 z-50' title='TVs' />
      </aside>
      <section className='space-y-10 mb-10'>
        <div
          style={{ backgroundImage: `url(${imagePaths.backdrop})` }}
          className='bg-center aspect-video bg-no-repeat bg-cover grid place-items-center'
        >
          <div className='w-full h-full flex  justify-center items-center backdrop-brightness-[0.4] p-4 md:p-10'>
            <div className='flex flex-col items-start sm:flex-row text-white gap-4 md:gap-8 lg:gap-16 mx-4 z-20'>
              <div className='relative w-full min-w-[15vw] max-w-[30vw] aspect-[1/1.5] overflow-clip rounded-md drop-shadow-2xl'>
                <Image
                  alt='Movie poster'
                  fill
                  src={imagePaths.poster}
                  priority
                />
              </div>
              <div className='flex flex-col gap-10 justify-between p-2'>
                <div className='flex flex-wrap flex-row justify-between'>
                  <div className='space-y-8 w-full'>
                    <div className='flex flex-wrap gap-y-2 justify-between items-center'>
                      <h1>
                        {tv.original_name}
                        <span className='text-neutral-200 text-sm ml-4 align-middle'>
                          {tv.first_air_date}
                        </span>
                      </h1>
                      {trailer && <TrailerPlayer videoKey={trailer?.key} />}
                    </div>
                    <p>{tv.tagline}</p>
                  </div>
                </div>

                <dl className='space-y-4'>
                  <dt className='text-xl text-neutral-200'>Overview</dt>
                  <dd className='text-lg'>
                    <ReadMore>{tv.overview}</ReadMore>
                  </dd>
                </dl>

                <dl>
                  <dt>{`Creator${creators.length > 1 ? 's' : ''}`}</dt>
                  <dd>{creators.map((creator) => creator.name).join(', ')}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <section className='flex flex-col md:flex-row gap-10 mx-10 justify-between'>
          <section className='space-y-10 overflow-hidden order-last md:order-first'>
            <h2 className='text-xl font-bold'>Cast</h2>
            <Cast forPath={`tv/${tvId}/credits`} />
          </section>
          <aside className='order-first md:order-last'>
            <ExternalLinks path={`tv/${tvId}/external_ids`} />
          </aside>
        </section>

        <section>
          <dl className='flex flex-wrap gap-[10%] gap-y-10 mx-10'>
            <div className='space-y-2'>
              <dt>Status</dt>
              <dd className='text-neutral-500 text-sm'>{tv.status}</dd>
            </div>
            <div className='space-y-2'>
              <dt>Original Language</dt>
              <dd className='text-neutral-500 text-sm'>
                {tv.original_language}
              </dd>
            </div>
            <div className='space-y-2'>
              <dt>Genres</dt>
              <dd className='text-neutral-500 text-sm'>
                <ul className='space-y-2'>
                  {tv.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className='space-y-2'>
              <dt>Popularity</dt>
              <dd className='text-neutral-500 text-sm'>{tv.popularity}</dd>
            </div>
          </dl>
        </section>

        <div className='mx-10 space-y-10'>
          <hr />

          <h2 className='text-xl font-bold'>Reviews</h2>
          <Reviews movieId={tvId} />
        </div>
      </section>
    </>
  );
}
