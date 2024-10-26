import { cookies } from 'next/headers';
import LoginComponent from './../../../Component/계정/로그인/Login';

async function login({ id, password }) {
  'use server';
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      cookies().set({
        name: 'accessToken',
        value: await data.accessToken,
        httpOnly: true,
        maxAge: 60 * 60,
        path: '/',
        sameSite: 'lax',
      });
      cookies().set({
        name: 'refreshToken',
        value: await data.refreshToken,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
      });
      return await data.role;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export default function LoginPage() {
  return (
    <div>
      <LoginComponent login={login} />
    </div>
  );
}
