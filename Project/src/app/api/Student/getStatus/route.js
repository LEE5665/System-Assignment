import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const num = searchParams.get("num");
    if(!num){
        return new Response(JSON.stringify({ error: '엄서요 엄서 넘버가 없다구요' }), { status: 500 });
    }
    try {
        const sections = await prisma.section.findMany({
            where: {
                students: {
                    some: {
                        Number: num
                    }
                }
            },
            select: {
                id: true,
                grade: true,
                class: true,
                minhour: true,
                maxhour: true,
                course: {
                    select: { courseName: true }
                },
                attendances: {
                    select: {
                        week: true,
                        period: true,
                        status: true,
                    },
                    orderBy: [{ week: 'asc' }, { period: 'asc' }],
                }
            },
            orderBy: [{ grade: 'asc' }, { class: 'asc' }],
        });

        const formattedSections = sections.map(section => {
            const maxWeek = 15;
            const attendanceMap = {};

            // 모든 주차, 교시 초기화
            for (let week = 1; week <= maxWeek; week++) {
                attendanceMap[week] = {};
                for (let period = section.minhour; period <= section.maxhour; period++) {
                    attendanceMap[week][period] = { status: '출결 전' };
                }
            }

            // 실제 출결 데이터로 채우기
            section.attendances.forEach(attendance => {
                attendanceMap[attendance.week][attendance.period] = {
                    status: attendance.status || '출결 전'
                };
            });

            return {
                id: section.id,
                title: section.course.courseName,
                grade: section.grade,
                class: section.class,
                attendanceData: attendanceMap,
            };
        });

        return new Response(JSON.stringify(formattedSections), { status: 200 });
    } catch (error) {
        console.error("에뤄", error);
        return new Response(JSON.stringify({ error: '에뤄' }), { status: 500 });
    }
}
