'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(data) {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set(data.name, data.value, { expires: Date.now() - oneDay });
}
