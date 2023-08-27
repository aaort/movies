'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  page: number;
  totalPages: number;
};

export default function Pagination({ page, totalPages }: Props) {
  const pathname = usePathname();
  const pages = Array.from([
    page - 2,
    page - 1,
    page,
    page + 1,
    page + 2,
  ]).filter((_page) => _page > 0 && _page <= totalPages);

  return (
    <ul className='flex gap-2'>
      {pages.map((_page) => (
        <li key={_page}>
          <Link
            href={`${pathname}?page=${_page}`}
            aria-selected={page === _page}
            className='hover:underline p-2 aria-selected:underline aria-selected:text-current'
          >
            {_page}
          </Link>
        </li>
      ))}
    </ul>
  );
}
