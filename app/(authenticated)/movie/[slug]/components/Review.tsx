type Props = {
  review: Review;
};

export default function Review({ review }: Props) {
  return (
    <li className='flex-none w-full max-h-[300px] overflow-hidden flex flex-col gap-10 rounded-md border-2 border-slate-100 p-4'>
      <div>{review.author}</div>
      <span className='overflow-ellipsis'>{review.content}</span>
    </li>
  );
}
