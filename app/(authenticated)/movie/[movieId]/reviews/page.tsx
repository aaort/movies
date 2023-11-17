import Review from '@/app/(authenticated)/_components/Review';
import { getReviews } from '@/app/(authenticated)/_sections/Reviews';
import Back from '@/app/_components/Back';
import { headers } from 'next/headers';

type Props = {};

export default async function ReviewsPage(props: Props) {
  const headersList = headers();
  const movieId = headersList
    .get('x-invoke-path')
    ?.split('/')
    .filter(Boolean)[1]!;

  const reviews = (await getReviews(movieId))?.results;

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
