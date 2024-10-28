import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // URL에서 쿼리 파라미터 추출
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const week = url.searchParams.get("week") || 1;
        const period = url.searchParams.get("period") || 1;

        // 필수 데이터 유효성 검사
        if (!id) {
            return new Response(JSON.stringify({ error: '섹션 ID는 필수입니다.' }), { status: 400 });
        }

        // 섹션 정보와 연결된 유저 목록을 가져옴
        const section = await prisma.section.findUnique({
            where: { id },
            select: {
                grade: true,
                class: true,
                minhour: true,
                maxhour: true,
                course: {
                    select: {
                        courseName: true
                    }
                },
                students: {
                    select: {
                        Number: true,
                        name: true,
                        attendances: {
                            where: {
                                sectionId: id,
                                week: parseInt(week),
                                period: parseInt(period),
                            },
                            select: {
                                status: true,
                            },
                        },
                    },
                },
            },
        });

        if (!section) {
            return new Response(JSON.stringify({ error: '해당 섹션을 찾을 수 없습니다.' }), { status: 404 });
        }
        // 학년, 반, 학생 목록과 출석 상태를 포함한 정보를 반환
        return new Response(
            JSON.stringify({
                courseName: section.course.courseName,  // courseName 포함
                grade: section.grade,
                class: section.class,
                minhour: section.minhour,
                maxhour: section.maxhour,
                students: section.students.map((student) => ({
                    Number: student.Number,
                    name: student.name,
                    status: student.attendances[0]?.status || 'N/A',
                })),
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return new Response(
            JSON.stringify({ error: '데이터를 불러오는 중 오류가 발생했습니다.' }),
            { status: 500 }
        );
    }
}
