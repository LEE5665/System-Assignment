import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    console.log(courseId);

    if (!courseId) {
        return new Response(JSON.stringify({ error: 'courseId가 필요합니다.' }), { status: 400 });
    }

    try {
        const sections = await prisma.section.findMany({
            where: { courseId },
            include: {
                course: true,
                instructor: true,
            },
        });
        return new Response(JSON.stringify({ sections }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 500 });
    }
}