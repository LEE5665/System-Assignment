import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        // 요청 본문에서 데이터를 추출
        const { statuses, week, period, sectionId } = await req.json();
        console.log(week);
        console.log(period);

        // 필수 데이터 유효성 검사
        if (!statuses || !week || !period || !sectionId) {
            return new Response(JSON.stringify({ error: '모든 필드를 입력해주세요.' }), { status: 400 });
        }

        // 현재 날짜 생성
        const currentDate = new Date();

        // 각 학생의 출석 상태를 저장하기 위해 entries 생성
        const attendanceEntries = Object.entries(statuses).map(([userId, status]) => ({
            userId,
            sectionId,
            week: parseInt(week),
            period: parseInt(period),
            status: String(status),
            date: currentDate, // 현재 날짜로 설정
        }));

        // 출석 데이터 생성 또는 업데이트
        for (const entry of attendanceEntries) {
            await prisma.attendance.upsert({
                where: {
                    userId_sectionId_week_period: {
                        userId: entry.userId,
                        sectionId: entry.sectionId,
                        week: entry.week,
                        period: entry.period,
                    }
                },
                update: {
                    status: entry.status,
                    date: currentDate,
                },
                create: entry
            });
        }

        return new Response(JSON.stringify({ message: '출석이 성공적으로 저장되었습니다.' }), { status: 200 });
    } catch (error) {
        console.error("Error saving attendance data:", error);
        return new Response(
            JSON.stringify({ error: '출석 데이터를 저장하는 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
}
