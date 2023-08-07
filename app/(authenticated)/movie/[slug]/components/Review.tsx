import { AiFillStar } from 'react-icons/ai';

type Props = {
  review: Review;
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Review({ review }: Props) {
  const writtenDate = new Date(review.created_at);

  const writtenStr = `${
    months[writtenDate.getMonth()]
  } ${writtenDate.getDay()}, ${writtenDate.getFullYear()}`;

  return (
    <li className='flex-none w-full max-h-[300px] overflow-hidden flex flex-col gap-10 rounded-md border-2 border-slate-100 p-4'>
      <div className='space-y-2'>
        <h3>
          By <span className='font-bold underline'>{review.author}</span>
        </h3>
        <div className='flex gap-2 items-center'>
          <span className='flex items-center gap-1 w-fit px-2 rounded-full bg-slate-800 text-slate-200'>
            <AiFillStar className='fill-slate-100' />
            {review.author_details.rating}
          </span>
          <span className='text-slate-700'>Written at - {writtenStr}</span>
        </div>
      </div>
      <span className='overflow-ellipsis'>{review.content}</span>
    </li>
  );
}
