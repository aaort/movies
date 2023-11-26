import Review from '@/app/(protected)/_components/Review';
import { GetReviewsResultType } from '@/app/(protected)/(details)/_sections/Reviews';
import Back from '@/app/_components/Back';
import get from '@/lib/api/get';
import { headers } from 'next/headers';

export default async function ReviewsPage() {
  const headersList = headers();
  const movieId = headersList
    .get('x-invoke-path')
    ?.split('/')
    .filter(Boolean)[1]!;

  const reviews = (await get<GetReviewsResultType>(`movie/${movieId}/reviews`))
    ?.results;

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
