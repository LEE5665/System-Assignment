import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const courses = await prisma.course.findMany();
        return new Response(JSON.stringify({ courses }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 405 });
    }
}