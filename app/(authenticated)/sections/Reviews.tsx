import get from '@/lib/api/get';
import Link from 'next/link';
import Review from '../_components/Review';

type Props = {
  movieId: string | number;
};

type GetReviewsResultType =
  | (ResultType<Review> & {
      id: number;
      total_pages: number;
      total_results: number;
    })
  | undefined
  | null;

export async function getReviews(
  movieId: string | number
): Promise<GetReviewsResultType> {
  return await get<GetReviewsResultType>(`movie/${movieId}/reviews`);
}

export default async function Reviews({ movieId }: Props) {
  const reviews = (await getReviews(movieId))?.results;

  if (!reviews || !reviews?.length) {
    return <h3>No Reviews so far</h3>;
  }

  return (
    <div>
      <ul className='max-w-full w-full inline-flex gap-10 overflow-x-auto pb-10'>
        {reviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </ul>
      <Link className='inline-block underline' href={`${movieId}/reviews`}>
        View All Reviews
      </Link>
    </div>
  );
}
