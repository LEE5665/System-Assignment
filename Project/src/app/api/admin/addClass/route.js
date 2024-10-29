import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
  const { courseId, grade, className, minhour, maxhour } = await request.json();

  if (!courseId || !grade || !className || minhour == null || maxhour == null) {
    return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
  }

  try {
    const section = await prisma.section.create({
      data: {
        courseId,
        grade,
        class: className,
        minhour: parseInt(minhour, 10),
        maxhour: parseInt(maxhour, 10),
      },
    });

    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '반 추가 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
