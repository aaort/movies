import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  if (cookies().has('session_id')) {
    redirect('/general');
  }

  redirect('/login/options');
}
