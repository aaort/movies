import Person from '@/app/components/Person';
import getTrendingPeople from '@/lib/getTrendingPeople';

export default async function TrendingPeople() {
  const people = (await getTrendingPeople()).results;

  return (
    <div className="grid gap-16 grid-cols-4">
      {people.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
}
