import Image from 'next/image';
import Link from 'next/link';
import { BsFillPersonFill } from 'react-icons/bs';

type Props = {
  person: Person | CastPerson;
  index: number;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function PersonCard({ person, index }: Props) {
  const fullProfilePath = person.profile_path
    ? `${imagesBaseUrl}${person.profile_path}`
    : null;

  return (
    <Link href='#' className='min-w-[20vw] grid-card group'>
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
        <div className='px-4 pb-4 grid-card-text-box'>
          <p>{person.name}</p>
          <p>{person.known_for_department}</p>
        </div>
      </div>
    </Link>
  );
}
