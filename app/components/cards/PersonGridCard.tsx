import Image from 'next/image';
import Link from 'next/link';
import { BsFillPersonFill } from 'react-icons/bs';

type Props = {
  person: Person;
  index: number;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function PersonGridCard({ person, index }: Props) {
  const fullProfilePath = person.profile_path
    ? `${imagesBaseUrl}${person.profile_path}`
    : null;

  return (
    <Link href='#'>
      <div className='grid-card h-full'>
        <div
          className={`relative w-full aspect-[1/1.5] grid place-items-center ${
            !fullProfilePath ? 'border-b-[1px] border-slate-400' : ''
          }`}
        >
          {fullProfilePath ? (
            <Image
              fill
              alt={`${person.name}'s profile picture`}
              src={fullProfilePath}
              sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
              className='object-fill'
              priority={index < 6}
            />
          ) : (
            <BsFillPersonFill className='w-[80%] h-[80%] ' />
          )}
        </div>
        <div className='mx-4 mb-4'>
          <p>{person.name}</p>
          <p>{person.known_for_department}</p>
        </div>
      </div>
    </Link>
  );
}
