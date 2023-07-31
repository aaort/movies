'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function CreateSession() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const requestToken = searchParams.get('request_token');

  useEffect(() => {
    if (!requestToken) return;
    const getSessionId = async () => {
      const response = await fetch(
        `${apiBaseUrl}authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${readApiKey}`,
          },
        }
      );

      const data = await response.json();
      const sessionId = data.session_id;

      if (!sessionId) return;
      sessionStorage.setItem('session_id', sessionId);
      push('/');
    };
    getSessionId();
  }, [requestToken, push]);

  return <h1>Creating session...</h1>;
}
