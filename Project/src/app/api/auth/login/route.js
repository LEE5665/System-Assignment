import { NextResponse } from 'next/server';

export async function POST(request) {
  const { id, password } = await request.json();
  console.log(id, password);
  if (id == '교수') {
    const accessToken = { name: '아무개', role: 'Professor', id: '1234' };
    const refreshToken = {};
    return NextResponse.json(
      {
        accessToken: JSON.stringify(accessToken),
        refreshToken: JSON.stringify(refreshToken),
        role: '교수',
        message: '로그인 성공적',
      },
      { status: 200 }
    );
  } else if (id == '학생') {
    const accessToken = { name: '홍길동', role: 'Student', id: '2345' };
    const refreshToken = {};
    return NextResponse.json(
      {
        accessToken: JSON.stringify(accessToken),
        refreshToken: JSON.stringify(refreshToken),
        role: '학생',
        message: '로그인 성공적',
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ error: '까비 그거 아님' }, { status: 401 });
  }
}
