type Props = {
  label: string;
  count: string | number;
};

export default function Count(props: Props) {
  const { label, count } = props;

  return (
    <dl className='flex gap-1'>
      <dt>{label}:</dt>
      <dd className='text-primary-500'>{count}</dd>
    </dl>
  );
}
