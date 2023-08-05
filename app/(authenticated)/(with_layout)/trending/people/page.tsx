import GridList from '@/app/components/GridList';
import PersonItem from '@/app/components/PersonItem';
import getTrendingPeople from '@/lib/api/getTrendingPeople';

export default async function TrendingPeople() {
  const people = (await getTrendingPeople()).results;

  return (
    <GridList>
      {people.map((person, index) => (
        <PersonItem key={person.id} person={person} index={index} />
      ))}
    </GridList>
  );
}
