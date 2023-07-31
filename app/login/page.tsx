'use client';
import getRequestToken from '@/lib/auth/getRequestToken';
import { useEffect, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default function Login() {
  const [requestToken, setRequestToken] = useState<string>();

  useEffect(() => {
    getRequestToken().then(setRequestToken);
  }, [setRequestToken]);

  const loginApproveUrl = `${baseUrl}authenticate/${requestToken}?redirect_to=${appUrl}login/createSession?request_token=${requestToken}`;

  return (
    <main className="h-[100svh] grid place-items-center">
      <a
        className="px-8 py-4 bg-slate-700 text-slate-100 rounded-md"
        href={requestToken ? loginApproveUrl : undefined}
      >
        Login
      </a>
    </main>
  );
}
