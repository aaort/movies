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

  return (
    <Link className={`${classes}`} href={to ?? previousRoute}>{`< ${
      to ?? previousRoute
    }`}</Link>
  );
}
