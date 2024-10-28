import { NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';

async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyToken`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      return response.data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('에러', error);
    return null;
  }
}
async function validateToken(accessToken) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyDateToken`,
      { token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return response.data.decoded;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to validate access token:', error);
    return null;
  }
}

export async function middleware(request) {
  const accessToken = request.cookies.get('accessToken')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  // 로그아웃 경로일 경우
  if (request.nextUrl.pathname === '/LogOut') {
    return NextResponse.next();
  }

  // 로그인 안한 경우
  if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname) && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/Login', request.url));
  } else {
    if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname) && !accessToken && refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        Cookies.set('accessToken', newAccessToken, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
          expires: 1 / 24,
        });
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/Register', request.url));
      }
    }
  }

  if (accessToken) {
    const decoded = await validateToken(accessToken);
    if (decoded) {
      const role = decoded.role;
      const path = request.nextUrl.pathname;
      if (!path.startsWith(`/${role}`)) {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
      }
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|api/admin|_next/static|_next/image|favicon.ico).*)'],
};

export const ROOT = '/';
export const PUBLIC_ROUTES = ['/Login', '/LogOut', '/Register'];
export const DEFAULT_REDIRECT = '/';