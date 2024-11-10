'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export default async function getName() {
  return jwt.verify(cookies().get('accessToken').value, process.env.JWT_SECRET)?.name;
}
