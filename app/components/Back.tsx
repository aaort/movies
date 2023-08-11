'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BsArrowLeftShort } from 'react-icons/bs';

type Props = {
  to?: string;
  classes?: string;
  title?: string;
};

export default function Back({ to, classes, title }: Props) {
  const pathname = usePathname();
  const { back, push } = useRouter();

  const previousRoute = pathname.slice(0, pathname.lastIndexOf('/'));
  const _title =
    title ?? (to ? to.slice(to.lastIndexOf('/')) : previousRoute).slice(1);

  const handleBack = () => {
    console.log(to);
    if (!to) return back();
    push(to);
  };

  return (
    <button className={`capitalize ${classes}`} onClick={handleBack}>
      <div className='flex gap-2 items-center'>
        <BsArrowLeftShort className='w-6 h-6' /> <span>{_title}</span>
      </div>
    </button>
  );
}
