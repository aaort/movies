import PersonCard from '@/app/_components/cards/PersonCard';
import get from '@/lib/api/get';
import type { Credits } from '@/types';

type Props = {
  forPath: string;
};

export default async function Cast({ forPath }: Props) {
  const cast = (await get<Credits>(forPath))?.cast;

  return (
    <ul className='max-w-full inline-flex gap-x-10 overflow-x-auto pb-8'>
      {cast?.map((person, i) => (
        <PersonCard
          index={i}
          key={person.id}
          person={person}
          className='min-w-[50vw] md:min-w-[30vw] lg:min-w-[20vw]'
        />
      ))}
    </ul>
  );
}
