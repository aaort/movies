import GridList from '@/app/_components/GridList';
import Pagination from '@/app/_components/Pagination';
import PersonCard from '@/app/_components/cards/PersonCard';
import get from '@/lib/api/get';

type Props = {
  searchParams: { [key: string]: string | null | undefined };
};

export default async function TrendingPeople({ searchParams }: Props) {
  const page = searchParams.page ?? 1;
  const parsedPage = Number(page);

  const url = `trending/person/week?page=${!isNaN(parsedPage) ? page : 1}`;
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
        {!isNaN(parsedPage) && totalPages ? (
          <Pagination page={parsedPage} totalPages={totalPages} />
        ) : null}
      </div>
    </section>
  );
}
