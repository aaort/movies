import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieDetails from '@/lib/api/getMovieDetails';
import getTrendingMovies from '@/lib/api/getTrendingMovies';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const movies = (await getTrendingMovies()).results;

  return movies.map((movie) => ({ slug: `${movie.id}` }));
}

export default async function MoviePage({ params: { slug: movieId } }: Props) {
  const movieDetails = await getMovieDetails(Number(movieId));

  const imagePaths = {
    backdrop: generateImageUrlByFilename(movieDetails.backdrop_path),
    poster: generateImageUrlByFilename(movieDetails.poster_path),
  };

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${imagePaths.backdrop})` }}
        className='bg-center bg-no-repeat h-[80svh] bg-cover grid place-items-center after:content-[" "] after:inset-0 after:absolute after:h-[80svh] after:opacity-60 after:bg-slate-950 after:z-10'
      >
        <div className='flex text-white flex-col lg:flex-row gap-4 md:gap-8 lg:gap-16 w-[80%] mx-auto z-20'>
          <div className='relative w-[100%] aspect-[1/1.5] overflow-clip rounded-md drop-shadow-2xl'>
            <Image alt='Poster' fill src={imagePaths.poster} />
          </div>

          <div className='flex flex-col gap-10 justify-between'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                  <h1>{movieDetails.title}</h1>
                  <span className='text-neutral-200'>
                    {movieDetails.release_date}
                  </span>
                </div>
                <span>Play Trailer</span>
              </div>
              <p>{movieDetails.tagline}</p>
            </div>

            <div className='space-y-4'>
              <p>Overview</p>
              <p>{movieDetails.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
