import Back from '@/app/components/Back';
import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieCredits from '@/lib/api/getMovieCredits';
import getMovieDetails from '@/lib/api/getMovieDetails';
import getMovieVideos from '@/lib/api/getMovieVideos';
import getTrendingMovies from '@/lib/api/getTrendingMovies';
import Image from 'next/image';
import TrailerPlayer from './components/TrailerPlayur';
import Cast from './sections/Cast';
import ExternalLinks from './sections/ExternalLinks';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const movies = (await getTrendingMovies()).results;

  return movies.map((movie) => ({ slug: `${movie.id}` }));
}

export default async function MoviePage({ params: { slug: movieId } }: Props) {
  const movie = await getMovieDetails(Number(movieId));
  const crew = (await getMovieCredits(Number(movieId))).crew;
  const videos = (await getMovieVideos(movieId)).results;

  const imagePaths = {
    backdrop: generateImageUrlByFilename(movie.backdrop_path),
    poster: generateImageUrlByFilename(movie.poster_path),
  };

  const director = crew.find((person) => person.job === 'Director');
  const writer = crew.find((person) => (person.job = 'Writer'));
  const trailer = videos.find((video) => video.type === 'Trailer');

  return (
    <>
      <div className='absolute left-2 top-2 z-50'>
        <Back classes='text-white' to='/trending/movies' />
      </div>
      <section className='space-y-10 mb-10'>
        <div className='relative bg-center aspect-video bg-no-repeat bg-cover grid place-items-center p-4 md:p-10'>
          <div className='absolute aspect-video top-0 w-full after:content-[" "] after:aspect-video after:inset-0 after:absolute after:opacity-60 after:bg-slate-950 after:z-10'>
            <div className='relative aspect-video'>
              <Image
                alt='Movie poster background'
                fill
                src={imagePaths.backdrop}
                priority
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row text-white gap-4 md:gap-8 lg:gap-16 mx-4 z-20'>
            <div className='relative w-full min-w-[15vw] max-w-[25vw] aspect-[1/1.3] overflow-clip rounded-md drop-shadow-2xl'>
              <Image alt='Movie poster' fill src={imagePaths.poster} priority />
            </div>
            <div className='flex flex-col gap-10 justify-between bg-slate-950 bg-opacity-60 md:bg-transparent p-2'>
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
                <div className='space-y-2'>
                  <dt id='director'>{director?.name}d</dt>
                  <dd className='text-neutral-300 text-sm'>Director</dd>
                </div>
                <div className='space-y-2'>
                  <dt>{writer?.name}</dt>
                  <dd className='text-neutral-300 text-sm'>Writer</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-10 mx-10 justify-between'>
          <div className='space-y-10 overflow-hidden order-last md:order-first'>
            <h3 className='text-xl font-bold'>Cast</h3>
            <Cast movieId={movie.id} />
          </div>
          <div className='order-first md:order-last'>
            <ExternalLinks movieId={movieId} />
          </div>
        </div>

        <section>
          <dl className='flex flex-wrap gap-[10%] gap-y-10 mx-10'>
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
      </section>
    </>
  );
}
