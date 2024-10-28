import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { courseId, grade, className, minhour, maxhour } = await req.json();
        if (!courseId || !grade || !className || !minhour || !maxhour) {
            return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
        }
        const section = await prisma.section.create({
            data: {
                grade,
                class: className,
                minhour: parseInt(minhour),
                maxhour: parseInt(maxhour),
                course: {
                    connect: { id: courseId },
                },
            },
        });
        return new Response(JSON.stringify(section), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: '반 생성 중 오류가 발생했습니다.' }), { status: 500 });
    }
}