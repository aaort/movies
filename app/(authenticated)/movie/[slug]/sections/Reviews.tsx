import get from '@/lib/api/get';
import Review from '../components/Review';

type Props = {
  movieId: string | number;
};

type GetResultType = ResultType<Review> & {
  id: number;
};

export default async function Reviews({ movieId }: Props) {
  const reviews = (await get<GetResultType>(`movie/${movieId}/reviews`))
    .results;

  return (
    <ul className='inline-flex gap-10 overflow-x-auto'>
      {reviews.map((review, i) => (
        <Review review={review} key={i} />
      ))}
    </ul>
  );
}
