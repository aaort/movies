import { cookies } from 'next/headers';

export default function isGuest(): boolean {
  return JSON.parse(cookies().get('is_guest')?.value || 'false');
}
