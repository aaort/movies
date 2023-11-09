'use client';

import Link from 'next/link';

type Props = {
  page: number;
  isActive: boolean;
};

export default function PaginationLink({ page, isActive }: Props) {
  return (
    <li key={page}>
      <Link
        replace
        href={`?page=${page}`}
        aria-selected={isActive}
        className='hover:underline p-2 aria-selected:underline aria-selected:text-current'
      >
        {page}
      </Link>
    </li>
  );
}
