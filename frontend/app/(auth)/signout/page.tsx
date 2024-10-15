import { redirect } from 'next/navigation';

async function signout() {
  'use server';
  redirect('/signin');
}
export default async function SingUpPage() {
  await signout();
  return null;
}
