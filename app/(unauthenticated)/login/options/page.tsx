import getRequestToken from '@/lib/auth/getRequestToken';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default async function Options() {
  const requestToken = await getRequestToken();

  const loginUrl = `${baseUrl}authenticate/${requestToken}?redirect_to=${appUrl}api/setSessionId`;

  return (
    <section aria-label='auth-options-section'>
      <div className='flex flex-col absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] gap-10'>
        <Link
          className='bg-slate-700 text-slate-100 px-4 py-2 rounded-md text-center'
          href={loginUrl}
          aria-disabled={!requestToken}
        >
          Login
        </Link>
        <Link
          className='bg-slate-700 text-slate-100 px-4 py-2 rounded-md'
          href='/api/setGuestSessionId'
        >
          Login As Guest
        </Link>
      </div>
    </section>
  );
}
