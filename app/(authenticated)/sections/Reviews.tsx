import get from '@/lib/api/get';
import Review from '../components/Review';
import Link from 'next/link';

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

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default async function Reviews({ movieId }: Props) {
  const reviews = (await getReviews(movieId))?.results;

  if (!reviews || !reviews?.length) {
    return <h3>No Reviews so far</h3>;
  }

  return (
    <div className='space-y-8'>
      <ul className='max-w-full inline-flex gap-10 overflow-x-auto pb-10'>
        {reviews.map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </ul>
      <Link
        className='inline-block underline'
        href={{
          pathname: `${appUrl}movie/${movieId}/reviews`,
          query: { movieId },
        }}
      >
        View All Reviews
      </Link>
    </div>
  );
}
