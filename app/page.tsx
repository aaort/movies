'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

export default function Home() {
  const [requestToken, setRequestToken] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    const getRequestToken = async () => {
      const data = await (
        await fetch(`${baseUrl}authentication/token/new`, {
          headers: {
            Authorization: `Bearer ${readApiKey}`,
          },
        })
      ).json();

      setRequestToken(data.request_token);
      console.log('done with request token');
    };

    getRequestToken();
  });

  const handleClick = async () => {
    router.push(
      `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://localhost:3000`
    );
  };

  return (
    <main className="flex flex-col items-center justify-center p-10">
      <button
        className="bg-slate-700 text-slate-100 px-4 py-2 rounded-sm"
        onClick={handleClick}
      >
        Authenticate
      </button>
    </main>
  );
}
