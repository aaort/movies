import PersonCard from '@/app/components/cards/PersonCard';
import get from '@/lib/api/get';

type Props = {
  forPath: string;
};

export default async function Cast({ forPath }: Props) {
  const cast = (await get<Credits>(forPath))?.cast;

  return (
    <ul className='flex gap-10 overflow-x-auto pb-8'>
      {cast?.map((person, i) => (
        <li key={person.id} className='min-w-[15vw]'>
          <PersonCard person={person} index={i} />
        </li>
      ))}
    </ul>
  );
}
