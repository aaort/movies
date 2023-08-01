'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  person: Person;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function Person({ person }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="flex flex-col gap-4 bg-slate-300 text-slate-900 rounded-md overflow-clip cursor-pointer duration-200 hover:scale-105">
      <div className="relative w-full aspect-[1/1.3]">
        <Image
          fill
          alt=""
          src={`${imagesBaseUrl}${person.profile_path}`}
          className={`object-fill duration-700 ease-in-out ${
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="mx-4 mb-4">
        <p>{person.name}</p>
        <p>{person.known_for_department}</p>
      </div>
    </div>
  );
}
