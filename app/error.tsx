'use client';

import { useEffect } from 'react';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center gap-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-primary-800'>
      <h2>{'Something went wrong, the error message is in the console'}</h2>
      <button onClick={reset} className='button'>
        Try Again
      </button>
    </div>
  );
}
