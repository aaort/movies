import Back from '@/app/components/Back';
import Review from '../../../components/Review';
import { getReviews } from '../../../sections/Reviews';

type Props = {
  searchParams: { movieId: string };
};

export default async function ReviewsPage({ searchParams }: Props) {
  const reviews = (await getReviews(searchParams.movieId))?.results;

  return (
    <section>
      <div className='absolute top-2 left-2'>
        <Back title={'Movie'} />
      </div>
      {reviews && (
        <div className='mx-10 my-20 flex flex-col gap-10'>
          {reviews.map((review, i) => (
            <Review key={i} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
