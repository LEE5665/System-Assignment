import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request) {
  try {
    // URL에서 쿼리 파라미터 추출
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('q'); // 검색어

    // 검색 조건 설정
    const searchCondition = searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery.toLowerCase() } }, // 이름 검색 (소문자로 변환)
            { email: { contains: searchQuery.toLowerCase() } }, // 이메일 검색 (소문자로 변환)
          ],
        }
      : {}; // 검색어가 없으면 조건 없음

    // 검색 조건에 맞는 교수 정보 가져오기
    const instructors = await prisma.user.findMany({
      where: searchCondition,
      select: {
        Number: true, // 교수 번호
        name: true, // 교수 이름
      },
    });

    // 교수 목록에서 Number가 6자리인 것만 필터링
    const filteredInstructors = instructors.filter((instructor) => {
      return instructor.Number.length === 6; // Number 필드의 길이가 6인 경우만
    });

    return NextResponse.json({ instructors: filteredInstructors }, { status: 200 });
  } catch (error) {
    console.error('교수 목록을 불러오는 중 오류가 발생했습니다:', error);
    return NextResponse.json({ error: '교수 목록을 불러오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
