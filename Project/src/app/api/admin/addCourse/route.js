import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function POST(request) {
  try {
    const { courseName, courseCode, instructorId } = await request.json();

    // 과목을 추가할 때, instructorId로 교수와 연결
    const course = await prisma.course.create({
      data: {
        courseName,
        courseCode,
        instructor: {
          connect: {
            Number: instructorId, // 교수의 Number 필드를 통해 관계 연결
          },
        },
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('과목 추가 중 오류 발생:', error);
    return NextResponse.json({ error: '과목 추가 중 오류 발생' }, { status: 500 });
  }
}
