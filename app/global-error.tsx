'use client';

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ reset }: Props) {
  return (
    <div className='flex flex-col items-center gap-4  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-primary-800'>
      <h2>Sorry, something went wrong</h2>
      <button onClick={reset} className='button'>
        Try Again
      </button>
    </div>
  );
}