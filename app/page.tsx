'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (!sessionStorage.getItem('session_id')) {
      redirect('/login');
    }
  });

  return (
    <main className="flex flex-col items-center justify-center p-10 gap-10">
      <h1>All configured and done</h1>
    </main>
  );
}
