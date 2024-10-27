import { NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';

async function LogOut(response) {
  clearCookie('accessToken', response);
  clearCookie('refreshToken', response);
  console.log("gg");
  return response;
}

function clearCookie(name, response) {
  response.cookies.set(name, '', {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
}

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

  // 로그아웃 처리 함수
  async function handleLogOut() {
    const response = NextResponse.redirect(new URL('/', request.url));
    await LogOut(response); // refreshToken.value가 있을 때만 로그아웃 처리
    return response;
  }

    // 로그아웃 경로일 경우
    if (request.nextUrl.pathname === '/LogOut') {
      console.log("이거됨");
      return await handleLogOut(); // handleLogOut의 결과를 기다림
    }

  // 로그인 안한 경우
  if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  // accessToken이 없고 refreshToken이 있는 경우
  // if (!accessToken && refreshToken) {
  //   if (!refreshToken.value) {
  //     console.error('미들웨어에서 유효하지 않은 리프레시 토큰:', refreshToken.value);
  //     return NextResponse.redirect(new URL('/signin', request.url));
  //   }

  //   const response = NextResponse.redirect(new URL('/signin', request.url));
  //   await LogOut(refreshToken.value, response); // refreshToken.value가 유효한 경우 로그아웃 처리
  //   return response;
  // }
  if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname) && !accessToken) {
    if (refreshToken) {
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
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    } else {
      return NextResponse.redirect(new URL('/Login', request.url));
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
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};

export const ROOT = '/';
export const PUBLIC_ROUTES = ['/Login', '/LogOut', '/Register'];
export const DEFAULT_REDIRECT = '/';
