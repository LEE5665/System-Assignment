import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');

  if (!courseId) {
    return NextResponse.json({ error: 'courseId가 필요합니다.' }, { status: 400 });
  }

  try {
    const sections = await prisma.section.findMany({
      where: {
        courseId,
      },
    });

    return NextResponse.json({ sections }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '반을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
