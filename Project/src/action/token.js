'use server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function getTokenId() {
  return jwt.verify(cookies().get('accessToken').value, process.env.JWT_SECRET);
}
