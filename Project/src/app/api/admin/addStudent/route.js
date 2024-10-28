import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // 요청 본문에서 studentId와 sectionId를 가져옵니다.
        const { studentId, sectionId } = await req.json();

        // 필수 데이터 유효성 검사
        if (!studentId || !sectionId) {
            return new Response(
                JSON.stringify({ error: '학생 ID와 섹션 ID는 필수입니다.' }),
                { status: 400 }
            );
        }

        // 섹션 조회: minhour와 maxhour 값을 가져옵니다.
        const section = await prisma.section.findUnique({
            where: { id: sectionId },
            select: { minhour: true, maxhour: true }
        });

        if (!section) {
            return new Response(
                JSON.stringify({ error: '섹션을 찾을 수 없습니다.' }),
                { status: 404 }
            );
        }

        // 주차별, 교시별 출석 데이터 생성
        const attendanceEntries = [];
        const totalWeeks = 15; // 주차 수

        for (let week = 1; week <= totalWeeks; week++) {
            for (let period = section.minhour; period <= section.maxhour; period++) {
                attendanceEntries.push({
                    userId: studentId,
                    sectionId: sectionId,
                    date: new Date(), // 날짜는 일단 그냥 현재날짜 지울수도
                    week: week,
                    period: period,
                    status: 'zero',
                });
            }
        }

        // 출석 데이터를 일괄 생성
        await prisma.attendance.createMany({
            data: attendanceEntries
        });

        return new Response(
            JSON.stringify({ message: '학생이 섹션에 성공적으로 추가되었으며, 출석 데이터가 생성되었습니다.' }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: '학생 추가 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
}