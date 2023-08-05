import Image from 'next/image';
import Link from 'next/link';

type Props = {
  tv: TV;
  index: number;
};

const imagesBaseUrl = 'https://image.tmdb.org/t/p/original/';

export default function TVItem({ tv, index }: Props) {
  return (
    <Link href='#'>
      <div className='grid-card'>
        <div className='relative w-full aspect-[1/1.5]'>
          <Image
            fill
            alt=''
            src={`${imagesBaseUrl}${tv.poster_path}`}
            sizes='(min-width: 1280px) calc(25vw - 112px), (min-width: 1040px) calc(25vw - 80px), (min-width: 780px) calc(25vw - 64px), calc(24.13vw - 49px)'
            className='object-fill'
            priority={index < 6}
          />
        </div>
        <div className='mx-4 mb-4'>
          <p>{tv.name}</p>
          <p>{tv.first_air_date}</p>
        </div>
      </div>
    </Link>
  );
}
