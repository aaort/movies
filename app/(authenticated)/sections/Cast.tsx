import generateImageUrlByFilename from '@/lib/generateImageUrlByFilename';
import get from '@/lib/api/get';
import Image from 'next/image';
import Link from 'next/link';
import type { Credits } from '../movie/[slug]/page';

type Props = {
  movieId: number;
};

export default async function Cast({ movieId }: Props) {
  const cast = (await get<Credits>(`movie/${movieId}/credits`)).cast;

  return (
    <ul className='flex gap-10 overflow-scroll'>
      {cast.map((person) => {
        const profilePath = person.profile_path
          ? generateImageUrlByFilename(person.profile_path)
          : null;
        return (
          <Link key={person.id} href='#'>
            <li className='flex flex-col h-full gap-4 bg-slate-600 text-slate-100 rounded-md'>
              <div className='relative max-w-[300px] min-w-[180px] aspect-[1/1.5] rounded-tl-md rounded-tr-md overflow-clip'>
                {profilePath ? (
                  <Image
                    alt={`${person.name}'s avatar`}
                    fill
                    src={profilePath}
                  />
                ) : null}
              </div>
              <div className='flex flex-col justify-between mx-4 mb-4'>
                <h3>{person.name}</h3>
                <p className='text-slate-300'>{person.known_for_department}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
