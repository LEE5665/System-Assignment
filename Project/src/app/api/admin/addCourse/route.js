import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { courseName, courseCode, instructorId } = await req.json();
        const course = await prisma.course.create({
            data: {
                courseName,
                courseCode,
                instructor: {
                    connect: { Number: instructorId },
                },
            },
        });
        return new Response(JSON.stringify(), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 500 });
    }
}