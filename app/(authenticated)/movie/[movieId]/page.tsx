import Back from '@/app/components/Back';
import ExternalLinks from '@/app/components/ExternalLinks';
import get from '@/lib/api/get';
import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import { Metadata } from 'next';
import Image from 'next/image';
import TrailerPlayer from '../../components/TrailerPlayer';
import Cast from '../../sections/Cast';
import Reviews from '../../sections/Reviews';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

type Props = {
  params: { movieId: string };
};

export async function generateMetadata({
  params: { movieId },
}: Props): Promise<Metadata> {
  const movie = await get<Movie>(`movie/${movieId}`);

  return {
    title: movie ? movie.title : 'Movie',
    description: movie && `Details page for ${movie.title} movie`,
  };
}

export async function generateStaticParams() {
  const movies = (await get<ResultType<Movie>>('trending/movie/week', {}, true))
    ?.results;

  return movies ? movies.map((movie) => ({ movieId: `${movie.id}` })) : [];
}

export const dynamicParams = true;

type ResponseType = MovieDetails & {
  videos: { results: Video[] };
  credits: Pick<Credits, 'cast' | 'crew'>;
};

export default async function MoviePage({ params: { movieId } }: Props) {
  const movie = await get<ResponseType>(
    `movie/${movieId}?api_key=${apiKey}&append_to_response=videos,credits`
  );

  if (!movie) {
    throw new Error('Sorry, unable to find requested data');
  }

  const videos = movie?.videos.results;
  const crew = movie?.credits.crew;

  const imagePaths = {
    backdrop: generateImageUrlByFilename(movie.backdrop_path),
    poster: generateImageUrlByFilename(movie.poster_path),
  };

  const director = crew?.find((person) => person.job === 'Director');
  const writer = crew?.find((person) => (person.job = 'Writer'));
  const trailer = videos?.find((video) => video.type === 'Trailer');

  return (
    <>
      <aside>
        <Back classes='text-white absolute left-2 top-2 z-50' />
      </aside>
      <main className='space-y-10 mb-10'>
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
                        {movie.title}
                        <span className='text-neutral-200 text-sm ml-4 align-middle'>
                          {movie.release_date}
                        </span>
                      </h1>
                      {trailer && <TrailerPlayer videoKey={trailer?.key} />}
                    </div>
                    <p>{movie.tagline}</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <p className='text-xl text-neutral-200'>Overview</p>
                  <p className='text-lg'>{movie.overview}</p>
                </div>

                <dl className='flex gap-10'>
                  {director && (
                    <div className='space-y-2'>
                      <dt id='director'>{director?.name}</dt>
                      <dd className='text-neutral-300 text-sm'>Director</dd>
                    </div>
                  )}
                  {writer && (
                    <div className='space-y-2'>
                      <dt>{writer?.name}</dt>
                      <dd className='text-neutral-300 text-sm'>Writer</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <section className='flex flex-col md:flex-row gap-10 mx-10 justify-between'>
          <div className='space-y-10 overflow-hidden order-last md:order-first'>
            <h2 className='text-xl font-bold'>Cast</h2>
            <Cast forPath={`movie/${movieId}/credits`} />
          </div>

          <aside className='order-first md:order-last'>
            <ExternalLinks path={`movie/${movieId}/external_ids`} />
          </aside>
        </section>

        <section className='mx-10 space-y-10'>
          <h2 className='text-xl font-bold mb-4 inline-block'>
            General information
          </h2>
          <dl className='flex flex-wrap gap-[10%] gap-y-10'>
            <div className='space-y-2'>
              <dt>Status</dt>
              <dd className='text-neutral-500 text-sm'>{movie.status}</dd>
            </div>
            <div className='space-y-2'>
              <dt>Original Language</dt>
              <dd className='text-neutral-500 text-sm'>
                {movie.original_language}
              </dd>
            </div>
            <div className='space-y-2'>
              <dt>Genres</dt>
              <dd className='text-neutral-500 text-sm'>
                <ul className='space-y-2'>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className='space-y-2'>
              <dt>Popularity</dt>
              <dd className='text-neutral-500 text-sm'>{movie.popularity}</dd>
            </div>
            <div className='space-y-2'>
              <dt>Budget</dt>
              <dd className='text-neutral-500 text-sm'>{movie.budget}</dd>
            </div>
            <div className='space-y-2'>
              <dt>Revenue</dt>
              <dd className='text-neutral-500 text-sm'>{movie.revenue}</dd>
            </div>
          </dl>
        </section>

        <hr className='border-slate-100 mx-10' />

        <section className='mx-10'>
          <h2 className='text-xl font-bold mb-10'>Reviews</h2>
          <Reviews movieId={movieId} />
        </section>
      </main>
    </>
  );
}
