import { NextResponse } from 'next/server';
// axios 대신 fetch를 사용하므로 axios와 js-cookie는 제거했습니다.

// Refresh Access Token 함수 수정
async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    if (response.ok) {
      // response.status === 200과 동일
      const data = await response.json();
      return data.accessToken;
    } else {
      console.error('Failed to refresh access token:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('에러', error);
    return null;
  }
}

// Validate Token 함수 수정
async function validateToken(accessToken) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyDataToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.decoded;
    } else {
      console.error('Failed to validate access token:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Failed to validate access token:', error);
    return null;
  }
}

// Middleware 함수 수정
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
        const response = NextResponse.next();
        response.cookies.set('accessToken', newAccessToken, {
          httpOnly: false,
          path: '/',
          sameSite: 'lax',
          maxAge: 3600,
        });
        return response;
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
  matcher: ['/((?!api/auth|api/admin|api/Professor|api/Student|_next/static|_next/image|favicon.ico).*)'],
};

export const ROOT = '/';
export const PUBLIC_ROUTES = ['/Login', '/LogOut', '/Register'];
export const DEFAULT_REDIRECT = '/';
