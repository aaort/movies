'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term: string) => {
    // @ts-expect-error Should be fixed in the newer version of next, should check: https://github.com/vercel/next.js/pull/53144
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className='relative grow text-base text-primary-500'>
      <input
        onChange={onChange}
        placeholder='Search movies, tvs and people'
        defaultValue={searchParams.get('query')?.toString()}
        className='px-4 py-2 rounded-md w-full border-[1px] border-primary-300'
      />

      {isPending && (
        <div className='absolute top-2 right-2 italic tracking-wider'>
          loading...
        </div>
      )}
    </div>
  );
};

export default Search;
