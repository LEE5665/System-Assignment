import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const num = searchParams.get("num");

    try {
        if(num) {
            const courses = await prisma.course.findMany({
                where: {
                    instructorId: num,
                },
            });
            return new Response(JSON.stringify({ courses }), { status: 200 });
        }
        else {
            const courses = await prisma.course.findMany();
            return new Response(JSON.stringify({ courses }), { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 405 });
    }
}