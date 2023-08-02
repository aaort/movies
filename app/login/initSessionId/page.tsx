'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

type Props = {
  searchParams: { request_token: string };
};

export default function InitSessionId({ searchParams }: Props) {
  const requestToken = searchParams.request_token;
  const { push } = useRouter();

  useEffect(() => {
    if (!requestToken) throw new Error("ain't got request token");
    const getSessionId = async () => {
      try {
        const data = await fetch(
          `${apiBaseUrl}authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
          { method: 'POST' }
        );

        const sessionId = (await data.json()).session_id;

        if (sessionId) {
          await fetch(`${appUrl}/api/setSessionId?session_id=${sessionId}`);
          push('/trending/movies');
        }
      } catch (e) {
        throw new Error('Could not get the request token');
      }
    };

    getSessionId();
  }, [requestToken, push]);

  return <h1>Initing Session Id</h1>;
}
