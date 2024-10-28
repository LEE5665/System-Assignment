import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { id, password, isStudent, birthdate, phone, email, name } = await req.json();
        const hashpassword = await bcrypt.hash(password, 10);
        const birthDate = new Date(birthdate);
        const user = await prisma.user.create({
            data: {
                Number: id,
                name,
                birthDate,
                phoneNumber: phone,
                email,
                password: hashpassword,
            }
        });
        const accessToken = jwt.sign(
            { userId: user.Number, name: user.name, role: isStudent ? 'Student' : 'Professor' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { userId: user.Number, name: user.name, role: isStudent ? 'Student' : 'Professor' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return new Response(JSON.stringify({ accessToken, refreshToken }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 500 });
    }
}