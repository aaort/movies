import PersonItem from '@/app/components/PersonItem';
import getTrendingPeople from '@/lib/getTrendingPeople';

export default async function TrendingPeople() {
  const people = (await getTrendingPeople()).results;

  return (
    <div className="grid gap-4 md:gap-10 lg:gap-14 xl:gap-16 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {people.map((person, index) => (
        <PersonItem key={person.id} person={person} index={index} />
      ))}
    </div>
  );
}
