'use client';
import getSessionId from '@/lib/auth/getSessionId';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateSession() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const requestToken = searchParams.get('request_token');

  useEffect(() => {
    if (!requestToken) throw new Error('Missing Request Token');

    getSessionId(requestToken).then((sessionId) => {
      if (sessionId) {
        sessionStorage.setItem('session_id', sessionId);
        push('/');
      } else {
        throw new Error('Missing Session id');
      }
    });
  }, [requestToken, push]);

  return <h1>Creating session...</h1>;
}
