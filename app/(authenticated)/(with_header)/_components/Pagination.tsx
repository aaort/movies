'use client';

import PaginationLink from './PaginationLink';

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: Props) {
  const pages = Array.from({ length: 5 }, (_, i) => page - 2 + i).filter(
    (_page) => _page > 0 && _page < totalPages
  );

  const includeFirst = !pages.includes(1);
  const includeLast = !pages.includes(totalPages);

  return (
    <ul className='flex gap-2'>
      {includeFirst && (
        <>
          <PaginationLink page={1} isActive={page === 1} />
          <span className='mx-1' />
        </>
      )}

      {pages.map((_page) => (
        <PaginationLink key={_page} page={_page} isActive={page === _page} />
      ))}

      {includeLast && (
        <>
          <span className='mx-1' />
          <PaginationLink page={totalPages} isActive={page === totalPages} />
        </>
      )}
    </ul>
  );
}
