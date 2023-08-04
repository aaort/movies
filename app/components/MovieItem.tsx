import Image from 'next/image';
import Actions from './Actions';
import { cookies } from 'next/headers';

type Props = {
  movie: Movie;
  index: number;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function MovieItem({ movie, index }: Props) {
  return (
    <div className="flex relative flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip cursor-pointer">
      <div className="relative w-full aspect-[1/1.5] after:content-[' '] after:absolute after:w-full after:h-full after:bg-slate-900 after:bg-opacity-0 hover:after:bg-opacity-40 after:duration-300">
        <Actions
          movieId={movie.id}
          sessionId={cookies().get('session_id')?.value}
        />
        <Image
          fill
          alt=""
          src={`${imagesBaseUrl}${movie.poster_path}`}
          sizes="(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)"
          className="object-fill"
          priority={index < 6}
        />
      </div>
      <div className="mx-4 mb-4">
        <p>{movie.title}</p>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
