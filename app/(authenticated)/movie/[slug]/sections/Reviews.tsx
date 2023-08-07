import get from '@/lib/api/get';
import Review from '../components/Review';

type Props = {
  movieId: string | number;
};

type GetResultType = ResultType<Review> & {
  id: number;
  total_pages: number;
  total_results: number;
};

export default async function Reviews({ movieId }: Props) {
  const reviews = (await get<GetResultType>(`movie/${movieId}/reviews`))
    .results;

  return (
    <ul className='max-w-full inline-flex gap-10 overflow-x-auto'>
      {reviews.map((review, i) => (
        <Review review={review} key={i} />
      ))}
    </ul>
  );
}
