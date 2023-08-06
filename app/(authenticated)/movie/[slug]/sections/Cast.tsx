import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieCredits from '@/lib/api/getMovieCredits';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  movieId: number;
};

export default async function Cast({ movieId }: Props) {
  const cast = (await getMovieCredits(movieId)).cast;

  return (
    <ul className='flex gap-10 overflow-scroll'>
      {cast.map((person) => {
        const profilePath = person.profile_path
          ? generateImageUrlByFilename(person.profile_path)
          : null;
        return (
          <Link key={person.id} href='#'>
            <li className='flex flex-col gap-4 bg-slate-600 text-slate-100 rounded-md'>
              <div className='relative max-w-[300px] min-w-[180px] aspect-[1/1.5] rounded-tl-md rounded-tr-md overflow-clip'>
                {profilePath ? (
                  <Image
                    alt={`${person.name}'s avatar`}
                    fill
                    src={profilePath}
                  />
                ) : null}
              </div>
              <div className='flex flex-col justify-between mx-4 mb-4 flex-1'>
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
