import { AiFillStar } from 'react-icons/ai';
import Markdown from 'react-markdown';

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
    <li className='flex-none basis-full w-full max-h-[300px] overflow-hidden flex flex-col gap-10 rounded-md border-2 border-primary-100 p-4'>
      <div className='space-y-2'>
        <h3>
          By <span className='font-bold underline'>{review.author}</span>
        </h3>
        <div className='flex gap-2 items-center'>
          {review.author_details.rating && (
            <span className='flex items-center gap-1 w-fit px-2 rounded-full bg-primary-800 text-primary-200'>
              <AiFillStar className='fill-primary-100' />
              {review.author_details.rating}
            </span>
          )}
          <span className='text-primary-700'>Written at - {writtenStr}</span>
        </div>
      </div>
      <div className='overflow-hidden'>
        <Markdown
          className='overflow-ellipsis break-words line-clamp-6'
          skipHtml={false}
        >
          {review.content}
        </Markdown>
      </div>
    </li>
  );
}
