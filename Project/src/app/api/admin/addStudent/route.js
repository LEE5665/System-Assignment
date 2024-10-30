import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { studentId, sectionId } = await req.json();

        // 필수 데이터 유효성 검사
        if (!studentId || !sectionId) {
            return new Response(
                JSON.stringify({ error: '학생 ID와 섹션 ID는 필수입니다.' }),
                { status: 400 }
            );
        }

        // 섹션 존재 여부 확인
        const sectionExists = await prisma.section.findUnique({
            where: { id: sectionId }
        });

        if (!sectionExists) {
            return new Response(
                JSON.stringify({ error: '섹션을 찾을 수 없습니다.' }),
                { status: 404 }
            );
        }

        // 학생이 섹션에 이미 연결되어 있는지 확인
        const isAlreadyEnrolled = await prisma.section.findFirst({
            where: {
                id: sectionId,
                students: {
                    some: { Number: studentId }
                }
            }
        });

        if (isAlreadyEnrolled) {
            return new Response(
                JSON.stringify({ message: '학생이 이미 섹션에 등록되어 있습니다.' }),
                { status: 400 }
            );
        }

        // 섹션에 학생 추가
        await prisma.section.update({
            where: { id: sectionId },
            data: {
                students: {
                    connect: { Number: studentId }
                }
            }
        });

        return new Response(
            JSON.stringify({ message: '학생이 섹션에 성공적으로 추가되었습니다.' }),
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