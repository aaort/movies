import getRequestToken from '@/lib/auth/getRequestToken';
import Link from 'next/link';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export default async function Login() {
  const requestToken = await getRequestToken();

  const loginUrl = `${baseUrl}authenticate/${requestToken}?redirect_to=${appUrl}api/setSessionId`;

  return (
    <section aria-label='auth-options-section'>
      <div className='flex flex-col gap-10 mx-4 absolute top-[50%] md:left-[50%] translate-y-[-50%] md:translate-x-[-50%] shadow-lg shadow-gray-200/40 border-primary-100 border-[1px] rounded-xl p-10'>
        <section className='mx-auto text-center space-y-4'>
          <b>
            <h1>Movies</h1>
          </b>

          <p>
            Login to your{' '}
            <Link href='https://www.themoviedb.org/' className='underline'>
              TMDB
            </Link>{' '}
            account (or create one) to access the full range of capabilities of
            the website
          </p>

          <p>
            <strong>OR</strong>
          </p>

          <p>
            Login as a guest to quickly view what is going on in the cinema
            world
            <span className='italic'>
              {' '}
              {
                "(Guest users will have limited access to the website's capabilities)"
              }
            </span>
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
