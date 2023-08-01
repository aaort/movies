'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (!sessionStorage.getItem('session_id')) {
      return redirect('/login');
    }

    redirect('/trending/movies');
  }, []);

  return (
    <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      Loading...
    </h2>
  );
}
