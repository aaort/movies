import PersonCard from '@/app/_components/cards/PersonCard';
import get from '@/lib/api/get';

type Props = {
  forPath: string;
};

export default async function Cast({ forPath }: Props) {
  const cast = (await get<Credits>(forPath))?.cast;

  return (
    <ul className='max-w-full inline-flex gap-x-10 overflow-x-auto pb-8'>
      {cast?.map((person, i) => (
        <li key={person.id} className='min-w-[20vw]'>
          <PersonCard person={person} index={i} />
        </li>
      ))}
    </ul>
  );
}
