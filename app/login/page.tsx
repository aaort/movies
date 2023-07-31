'use client';
import { useEffect, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const readApiKey = process.env.NEXT_PUBLIC_API_READ_ACCESS_KEY;

const url = 'https://movies-gamma-wine.vercel.app/';

export default function Login() {
  const [requestToken, setRequestToken] = useState<string>();

  useEffect(() => {
    const getRequestToken = async () => {
      const data = await (
        await fetch(`${baseApiUrl}authentication/token/new`, {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${readApiKey}`,
          },
        })
      ).json();

      console.log(requestToken);
      setRequestToken(data.request_token);
    };

    getRequestToken();
  });
  return (
    <main>
      <a
        href={
          requestToken
            ? `${baseUrl}authenticate/${requestToken}?redirect_to=${url}login/createSession?request_token=${requestToken}`
            : undefined
        }
      >
        Login
      </a>
    </main>
  );
}
