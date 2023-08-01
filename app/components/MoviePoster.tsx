'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  movie: Movie;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function MoviePoster({ movie }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="flex flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip cursor-pointer duration-200 hover:scale-105">
      <div className="relative w-full aspect-[1/1.3]">
        <Image
          fill
          alt=""
          src={`${imagesBaseUrl}${movie.poster_path}`}
          sizes="(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)"
          className={`object-fill duration-700 ease-in-out ${
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="mx-4 mb-4">
        <p>{movie.title}</p>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
