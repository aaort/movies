'use client';

import { useEffect, useRef, useState } from 'react';

type Props = React.PropsWithChildren & {};

export default function ReadMore({ children }: Props) {
  if (typeof children !== 'string') {
    throw new Error('children must a be a string component');
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.clientHeight;
    const lineHeight = parseInt(
      getComputedStyle(contentRef.current).lineHeight,
      10
    );

    // Check if the content is taller than 4 lines
    if (contentHeight > lineHeight * 4) {
      setIsExpanded(true);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const contentClass = isExpanded ? 'max-h-none' : 'max-h-[4em]';
  const buttonText = isExpanded ? 'Read Less' : 'Read More';

  return (
    <>
      <span
        ref={contentRef}
        className={`line-clamp-4 ${contentClass} text-ellipsis`}
      >
        {children}
      </span>
      {children.split('\n').length > 4 && (
        <button className='text-blue-500' onClick={toggleExpand}>
          {buttonText}
        </button>
      )}
    </>
  );
}
