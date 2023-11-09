import GridList from '@/app/_components/GridList';
import Pagination from '@/app/_components/Pagination';
import PersonCard from '@/app/_components/cards/PersonCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingPeople({ searchParams }: Props) {
  const _page = searchParams.page || '';
  const page = Number(_page) || 1;

  const url = `trending/person/week?page=${page}`;
  const data = await get<ResultType<Person>>(url, {}, true);

  const people = data?.results;
  const totalPages = data?.total_pages;

  if (!people) {
    throw new Error(
      'Sorry, request cannot be satisfied at the moment, try later'
    );
  }

  return (
    <section className='flex flex-col gap-y-10'>
      <GridList>
        {people.map((person, index) => (
          <PersonCard key={person.id} person={person} index={index} />
        ))}
      </GridList>
      <div className='self-end'>
        {!isNaN(page) && totalPages ? (
          <Pagination page={page} totalPages={totalPages} />
        ) : null}
      </div>
    </section>
  );
}
