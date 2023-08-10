import GridList from '@/app/components/GridList';
import PersonGridCard from '@/app/components/cards/PersonGridCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingPeople({ searchParams }: Props) {
  const searchText = searchParams.search ?? '';
  const url = searchText
    ? `search/person?query=${searchText}`
    : 'trending/person/week';
  const people = (await get<ResultType<Person>>(url, {}, !searchText))?.results;

  if (!people) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <GridList>
      {people.map((person, index) => (
        <PersonGridCard key={person.id} person={person} index={index} />
      ))}
    </GridList>
  );
}
