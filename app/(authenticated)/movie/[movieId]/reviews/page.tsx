import Back from '@/app/_components/Back';
import Review from '../../../_components/Review';
import { getReviews } from '../../../sections/Reviews';

type Props = {
  searchParams: { movieId: string };
};

export default async function ReviewsPage({ searchParams }: Props) {
  const reviews = (await getReviews(searchParams.movieId))?.results;

  return (
    <>
      <aside>
        <Back title={'Movie'} classes='absolute top-2 left-2' />
      </aside>
      <main>
        {reviews && (
          <div className='mx-10 my-20 flex flex-col gap-10'>
            <h1>Reviews</h1>
            {reviews.map((review, i) => (
              <Review key={i} review={review} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
