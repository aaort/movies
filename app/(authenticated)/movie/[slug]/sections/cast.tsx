import generateImageUrlByFilename from '@/lib/api/generateImageUrlByFilename';
import getMovieCredits from '@/lib/api/getMovieCredits';
import Image from 'next/image';

type Props = {
  movieId: number;
};

export default async function Cast({ movieId }: Props) {
  const cast = (await getMovieCredits(movieId)).cast;

  return (
    <div className='flex gap-10 mx-20 overflow-scroll'>
      {cast.map((person) => {
        const profilePath = person.profile_path
          ? generateImageUrlByFilename(person.profile_path)
          : null;
        return (
          <div
            key={person.id}
            className='flex flex-col gap-4 bg-slate-200 rounded-md'
          >
            <div className='relative max-w-[300px] min-w-[180px] aspect-[1/1.5] rounded-tl-md rounded-tr-md overflow-clip'>
              {profilePath ? (
                <Image alt={`${person.name}'s avatar`} fill src={profilePath} />
              ) : null}
            </div>
            <div className='mx-2 space-y-4'>
              <p>{person.name}</p>
              <p>{person.known_for_department}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
