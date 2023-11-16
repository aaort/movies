'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

type Props = React.PropsWithChildren & {};

export default function Drawer({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    // Close drawer on each route change
    setIsOpen(false);
  }, [segment]);

  const toggle = () => setIsOpen(!isOpen);

  const classes = `${isOpen ? 'right-0' : '-right-[100%]'}`;

  return (
    <>
      {isOpen ? (
        <MdOutlineClose className='drawer-toggle-button' onClick={toggle} />
      ) : (
        <RxHamburgerMenu className='drawer-toggle-button' onClick={toggle} />
      )}

      <div className={`absolute h-full duration-300 ${classes}`}>
        {children}
      </div>
    </>
  );
}
