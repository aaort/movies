'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  to?: string;
  classes?: string;
};

export default function Back({ to, classes }: Props) {
  const pathname = usePathname();

  const previousRoute = pathname.slice(0, pathname.lastIndexOf('/'));
  const title = (to ? to.slice(to.lastIndexOf('/')) : previousRoute).slice(1);

  return (
    <Link
      className={`capitalize ${classes}`}
      href={to ?? previousRoute}
    >{`< ${title}`}</Link>
  );
}
