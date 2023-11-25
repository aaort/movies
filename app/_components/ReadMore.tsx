'use client';

import { useEffect, useRef, useState } from 'react';

type Props = React.PropsWithChildren & {};

export default function ShowMoreLess({ children }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isExpandable, setIsExpandable] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;

    if (element.scrollHeight > element.clientHeight) {
      setIsExpandable(true);
    }
  }, []);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const classes = isExpanded ? 'line-clamp-none' : 'line-clamp-4';

  return (
    <>
      <p
        ref={ref}
        className={`line-clamp-5 ${classes} transition duration-300 paragraph`}
      >
        {children}
      </p>
      {isExpandable && (
        <button onClick={toggle} className='underline my-2'>
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </>
  );
}
