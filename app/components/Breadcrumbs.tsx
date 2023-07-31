'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();

  const paths = pathname.split('/');

  return (
    <div className="flex gap-4">
      {paths.map((path) => {
        return (
          <Link key={path} href="#">
            {path}
          </Link>
        );
      })}
    </div>
  );
}
