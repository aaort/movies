'use client';

import getRequestToken from '@/lib/auth/getRequestToken';
import { useRouter } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default function Options() {
  const { push } = useRouter();

  const handleCreateRequestToken = async () => {
    const requestToken = await getRequestToken();

    push(
      `${baseUrl}authenticate/${requestToken}?redirect_to=${appUrl}login/initSessionId`
    );
  };

  return (
    <section aria-label="auth-options-section">
      <div className="flex flex-col absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] gap-10">
        <button
          className="bg-slate-700 text-slate-100 px-4 py-2 rounded-md"
          onClick={handleCreateRequestToken}
        >
          Login
        </button>
        <button className="bg-slate-700 text-slate-100 px-4 py-2 rounded-md">
          Login As Guest
        </button>
      </div>
    </section>
  );
}
