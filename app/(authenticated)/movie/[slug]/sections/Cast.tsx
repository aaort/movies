import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieCredits from '@/lib/api/getMovieCredits';
import Image from 'next/image';

type Props = {
  movieId: number;
};

export default async function Cast({ movieId }: Props) {
  const cast = (await getMovieCredits(movieId)).cast;

  return (
    <ul className='flex gap-10'>
      {cast.map((person) => {
        const profilePath = person.profile_path
          ? generateImageUrlByFilename(person.profile_path)
          : null;
        return (
          <li
            key={person.id}
            className='flex flex-col gap-4 bg-slate-200 rounded-md'
          >
            <div className='relative max-w-[300px] min-w-[180px] aspect-[1/1.5] rounded-tl-md rounded-tr-md overflow-clip'>
              {profilePath ? (
                <Image alt={`${person.name}'s avatar`} fill src={profilePath} />
              ) : null}
            </div>
            <div className='flex flex-col justify-between mx-2 gap-4 mb-4 flex-1'>
              <p>{person.name}</p>
              <p>{person.known_for_department}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
