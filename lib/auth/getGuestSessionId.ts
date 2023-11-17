import { API_BASE_URL, API_READ_ACCESS_KEY } from '../constants';

export default async function getGuestSessionId() {
  const data = await fetch(`${API_BASE_URL}authentication/guest_session/new`, {
    cache: 'no-cache',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_KEY}`,
    },
  });

  return (await data.json()).guest_session_id;
}
