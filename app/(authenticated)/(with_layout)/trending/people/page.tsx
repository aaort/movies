import GridList from '@/app/_components/GridList';
import PersonCard from '@/app/_components/cards/PersonCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingPeople({ searchParams }: Props) {
  const url = 'trending/person/week';
  const people = (await get<ResultType<Person>>(url, {}, true))?.results;

  if (!people) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <GridList>
      {people.map((person, index) => (
        <PersonCard key={person.id} person={person} index={index} />
      ))}
    </GridList>
  );
}
