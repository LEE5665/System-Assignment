import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
  const { sectionId, studentId } = await request.json();

  if (!sectionId || !studentId) {
    return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
  }

  try {
    await prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        students: {
          connect: { Number: studentId },
        },
      },
    });

    return NextResponse.json({ message: '학생이 반에 추가되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '학생 추가 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
