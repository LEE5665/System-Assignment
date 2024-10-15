import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const res = NextResponse.json({ success: true });
  res.cookies.set('user-token', '12345', { path: '/' });
  return res;
}
