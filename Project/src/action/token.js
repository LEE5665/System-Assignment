import { cookies } from 'next/headers';

export async function getTokenId() {
  return JSON.parse(cookies().get('accessToken').value).id;
}
