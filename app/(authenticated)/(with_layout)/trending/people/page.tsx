import GridList from '@/app/components/GridList';
import PersonItem from '@/app/components/PersonItem';
import get from '@/lib/api/get';

export default async function TrendingPeople() {
  const people = (
    await get<ResultType<Person>>(`trending/person/week`, {}, true)
  ).results;

  return (
    <GridList>
      {people.map((person, index) => (
        <PersonItem key={person.id} person={person} index={index} />
      ))}
    </GridList>
  );
}
