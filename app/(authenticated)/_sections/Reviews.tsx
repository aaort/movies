import get from '@/lib/api/get';
import type { ResultType } from '@/lib/types';
import type { Review as ReviewType } from '@/types';
import Link from 'next/link';
import Review from '../_components/Review';

type Props =
  | { movieId: string | number; tvId?: never }
  | { tvId: string | number; movieId?: never };

export type GetReviewsResultType = ResultType<ReviewType> & {
  id: number;
  total_pages: number;
  total_results: number;
};

export default async function Reviews({ movieId, tvId }: Props) {
  const url = (movieId ? `movie/${movieId}` : `tv/${tvId}`) + '/reviews';
  const reviews = (await get<GetReviewsResultType>(url))?.results;

  if (!reviews || !reviews?.length) {
    return <h3 className='my-10'>No Reviews so far</h3>;
  }

  return (
    <section className='space-y-6'>
      <hr className='my-10' />

      <div className='flex justify-between items-start'>
        <h2>Reviews</h2>

        <Link className='inline-block underline' href={`${movieId}/reviews`}>
          View All Reviews
        </Link>
      </div>

      <ul className='max-w-full w-full inline-flex gap-10 overflow-x-auto pb-6'>
        {reviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </ul>
    </section>
  );
}
