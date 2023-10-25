type Props = {
  movieCount: number;
  tvCount: number;
  peopleCount: number;
};

export default function DataCounts(props: Props) {
  const { movieCount, tvCount, peopleCount } = props;

  return (
    <div className='flex gap-4 bg-primary-200 px-4 py-2 rounded-md'>
      <dl className='flex gap-1'>
        <dt>Movies:</dt>
        <dd className='text-primary-500'>{movieCount}</dd>
      </dl>

      <dl className='flex gap-1'>
        <dt>TVs:</dt>
        <dd className='text-primary-500'>{tvCount}</dd>
      </dl>

      <dl className='flex gap-1'>
        <dt>People:</dt>
        <dd className='text-primary-500'>{peopleCount}</dd>
      </dl>
    </div>
  );
}
