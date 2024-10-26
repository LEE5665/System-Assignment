import { NextResponse } from 'next/server';

async function LogOut(refreshToken, response) {
  if (!refreshToken) {
    console.warn('로그아웃 시 리프레시 토큰이 유효하지 않음:', refreshToken);
    return; // 유효하지 않다면 아무 작업도 하지 않음
  }

  // 쿠키 삭제
  clearCookie('accessToken', response);
  clearCookie('refreshToken', response);
}

function clearCookie(name, response) {
  response.cookies.set(name, '', {
    expires: new Date(0),
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
}

export async function middleware(request) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // 로그아웃 처리 함수
  async function handleLogOut() {
    const response = NextResponse.redirect(new URL('/signin', request.url));
    await LogOut(refreshToken?.value, response); // refreshToken.value가 있을 때만 로그아웃 처리
    return response;
  }

  // 로그인 안한 경우
  if (!PUBLIC_ROUTES.includes(request.nextUrl.pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  // 이미 로그인한 경우
  if (PUBLIC_ROUTES.includes(request.nextUrl.pathname) && accessToken) {
    return NextResponse.redirect(new URL(`/${JSON.parse(accessToken.value).role}`, request.url));
  }

  // accessToken이 없고 refreshToken이 있는 경우
  if (!accessToken && refreshToken) {
    if (!refreshToken.value) {
      console.error('미들웨어에서 유효하지 않은 리프레시 토큰:', refreshToken.value);
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    const response = NextResponse.redirect(new URL('/signin', request.url));
    await LogOut(refreshToken.value, response); // refreshToken.value가 유효한 경우 로그아웃 처리
    return response;
  }

  // 로그아웃 경로일 경우
  if (request.nextUrl.pathname === '/LogOut') {
    return await handleLogOut(); // handleLogOut의 결과를 기다림
  }

  if (accessToken) {
    const role = JSON.parse(accessToken.value).role;
    const path = request.nextUrl.pathname;
    if (!path.startsWith(`/${role}`)) {
      return NextResponse.redirect(new URL(`/${role}`, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};

export const ROOT = '/';
export const PUBLIC_ROUTES = ['/Login', 'LogOut'];
export const DEFAULT_REDIRECT = '/';
