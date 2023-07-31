'use client';

import Image from 'next/image';

type Props = {
  movie: Movie;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function MoviePoster({ movie }: Props) {
  return (
    <div className="flex flex-col gap-10 bg-slate-300 text-slate-900 rounded-md p-4">
      <div className="relative w-full aspect-square overflow-clip rounded-md">
        <Image
          fill
          alt=""
          src={`${imagesBaseUrl}${movie.poster_path}`}
          style={{ objectFit: 'fill' }}
        />
      </div>
      <div>
        <p>{movie.title}</p>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
