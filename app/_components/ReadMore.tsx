'use client';

import { useState } from 'react';

type Props = React.PropsWithChildren & {};

export default function ReadMore({ children }: Props) {
  if (typeof children !== 'string') {
    throw new Error('children must a be a string component');
  }

  const text = children as string;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const contentClass = isExpanded ? 'line-clamp-none' : 'line-clamp-4';
  const buttonText = isExpanded ? 'Read less' : 'Read more';

  return (
    <>
      <p className={`overflow-hidden ${contentClass}`}>{children}</p>
      {text.split('\n').length > 4 && (
        <button className='underline font-bold' onClick={toggleExpand}>
          {buttonText}
        </button>
      )}
    </>
  );
}
