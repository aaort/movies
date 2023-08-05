import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieDetails from '@/lib/api/getMovieDetails';
import getTrendingMovies from '@/lib/api/getTrendingMovies';
import Image from 'next/image';
import Cast from './sections/cast';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const movies = (await getTrendingMovies()).results;

  return movies.map((movie) => ({ slug: `${movie.id}` }));
}

export default async function MoviePage({ params: { slug: movieId } }: Props) {
  const movie = await getMovieDetails(Number(movieId));

  const imagePaths = {
    backdrop: generateImageUrlByFilename(movie.backdrop_path),
    poster: generateImageUrlByFilename(movie.poster_path),
  };

  return (
    <section className='space-y-10 mb-10'>
      <div
        style={{ backgroundImage: `url(${imagePaths.backdrop})` }}
        className='bg-center bg-no-repeat h-[80svh] bg-cover grid place-items-center after:content-[" "] after:inset-0 after:absolute after:h-[80svh] after:opacity-60 after:bg-slate-950 after:z-10'
      >
        <div className='flex text-white gap-4 md:gap-8 lg:gap-16 w-[85%] mx-auto z-20'>
          <div className='relative w-[100%] min-w-[200px] aspect-[1/1.5] overflow-clip rounded-md drop-shadow-2xl'>
            <Image alt='Poster' fill src={imagePaths.poster} />
          </div>

          <div className='flex flex-col gap-10 justify-between'>
            <div className='space-y-8'>
              <div className='flex justify-between items-center'>
                <h1>
                  {movie.title}
                  <span className='text-neutral-200 text-sm ml-4'>
                    {movie.release_date}
                  </span>
                </h1>
                <span>Play Trailer</span>
              </div>
              <p>{movie.tagline}</p>
            </div>

            <div className='space-y-4'>
              <p className='text-xl text-neutral-200'>Overview</p>
              <p className='text-lg'>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <Cast movieId={movie.id} />
    </section>
  );
}
