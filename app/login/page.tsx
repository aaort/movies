import getRequestToken from '@/lib/auth/getRequestToken';
import { APP_URL, BASE_URL } from '@/lib/constants';
import Link from 'next/link';

export default async function Login() {
  const requestToken = await getRequestToken();

  const loginUrl = `${BASE_URL}authenticate/${requestToken}?redirect_to=${APP_URL}api/setSessionId`;

  return (
    <section aria-label='auth-options-section'>
      <div className='flex flex-col gap-10 mx-4 absolute top-[50%] md:left-[50%] translate-y-[-50%] md:translate-x-[-50%] shadow-lg shadow-gray-200/40 border-primary-100 border-[1px] rounded-xl p-10'>
        <section className='mx-auto text-center space-y-4'>
          <h1 className='font-bold'>Movies</h1>

          <p>
            Login to your{' '}
            <Link href='https://www.themoviedb.org/' className='underline'>
              TMDB
            </Link>{' '}
            account (or create one) to access the full range of capabilities of
            the website
            <p>
              <strong>OR</strong>
            </p>
            Login as a guest to quickly view what is going on in the cinema
            world
            <i>
              {
                " (Guest users will have limited access to the website's capabilities)"
              }
            </i>
          </p>
        </section>

        <Link className='button' href={loginUrl} aria-disabled={!requestToken}>
          Login
        </Link>

        <Link className='button' href='/api/setGuestSessionId'>
          Login As A Guest
        </Link>
      </div>
    </section>
  );
}
