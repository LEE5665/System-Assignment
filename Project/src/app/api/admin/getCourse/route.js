import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            Number: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '과목을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
