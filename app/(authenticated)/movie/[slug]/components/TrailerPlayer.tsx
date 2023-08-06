'use client';

import { useState } from 'react';

type Props = {
  videoKey: string;
};

export default function TrailerPlayer({ videoKey }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return <button onClick={handleOpen}>Play Trailer</button>;
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      className='modal w-full h-full grid place-items-center'
      onClick={handleClose}
    >
      <iframe
        width={727}
        height={409}
        src={`https://youtube.com/embed/${videoKey}`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='rounded-md'
      />
    </div>
  );
}
