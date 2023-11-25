import Count from '../_components/Count';

type Props = {
  movieCount: number;
  tvCount: number;
  peopleCount: number;
};

export default function DataCounts(props: Props) {
  const { movieCount, tvCount, peopleCount } = props;

  return (
    <div className='flex gap-4 bg-primary-200 px-4 py-2 rounded-md'>
      <Count label='movies' count={movieCount} />

      <Count label='tvs' count={tvCount} />

      <Count label='people' count={peopleCount} />
    </div>
  );
}
