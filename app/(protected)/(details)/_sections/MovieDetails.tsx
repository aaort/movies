import ReadMore from '@/app/_components/ReadMore';
import type { MovieDetails as MovieDetailsType, Video } from '@/types';
import Image from 'next/image';
import TrailerPlayer from '../../_components/TrailerPlayer';

type Props = Pick<MovieDetailsType, 'title' | 'tagline' | 'overview'> & {
  posterPath: MovieDetailsType['poster_path'];
  backdropPath: MovieDetailsType['backdrop_path'];
  releaseDate: MovieDetailsType['release_date'];
  trailerVideoKey?: Video['key'];
  creators?: { name: string; role: string }[];
};

export default function MovieDetails(props: Props) {
  const {
    title,
    tagline,
    overview,
    creators,
    posterPath,
    releaseDate,
    backdropPath,
    trailerVideoKey,
  } = props;

  return (
    <div
      style={{ backgroundImage: `url(${backdropPath})` }}
      className='bg-center aspect-video bg-no-repeat bg-cover grid place-items-center text-primary-100'
    >
      <div className='w-full h-full flex justify-center items-center backdrop-brightness-[0.4] horizontal-p my-14'>
        <div className='flex flex-col items-start sm:flex-row text-white gap-4 md:gap-8 lg:gap-16 z-20'>
          <div className='relative w-full min-w-[15vw] max-w-[30vw] aspect-[1/1.5] overflow-clip rounded-md drop-shadow-2xl'>
            <Image alt='Movie poster' fill src={posterPath} priority />
          </div>

          <div className='flex flex-col gap-10 justify-between'>
            <div className='flex flex-wrap flex-row justify-between'>
              <div className='space-y-8 w-full'>
                <div className='flex flex-wrap gap-y-2 justify-between items-center'>
                  <h1>
                    {title}
                    <span className='text-primary-200 text-sm ml-4 align-middle'>
                      {releaseDate}
                    </span>
                  </h1>

                  {trailerVideoKey && (
                    <TrailerPlayer videoKey={trailerVideoKey} />
                  )}
                </div>

                <p>{tagline}</p>
              </div>
            </div>

            <dl className='space-y-4'>
              <dt className='text-xl text-primary-200'>Overview</dt>
              <dd className='text-lg'>
                <ReadMore>{overview}</ReadMore>
              </dd>
            </dl>

            <dl className='space-y-4'>
              <p className='text-xl text-primary-200'>Creators</p>
              <ul className='flex gap-10'>
                {creators?.map((creator) => {
                  return (
                    <li key={creator.name} className='space-y-2'>
                      <dt>{creator.name}</dt>
                      <dd className='text-primary-300 text-sm'>
                        {creator.role}
                      </dd>
                    </li>
                  );
                })}
              </ul>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
