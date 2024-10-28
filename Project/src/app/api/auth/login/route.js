import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { id, password, isStudent } = await req.json();

    //관리자
    if(id == 'admin' && password == '123') {
      const accessToken = jwt.sign(
        { userId: 'admin', name: '관리자', role: 'Admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      const refreshToken = jwt.sign(
        { userId: 'admin', name: '관리자', role: 'Admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return new Response(JSON.stringify({ accessToken, refreshToken }), { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: {
        Number: id
      }
    });
    if (!user) {
      return new Response(JSON.stringify({ error: '사용자를 찾을 수 없습니다.' }), { status: 401 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }
    const accessToken = jwt.sign(
      { userId: user.id, name: user.name, role: isStudent ? 'Student' : 'Professor' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, name: user.name, role: isStudent ? 'Student' : 'Professor' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    return new Response(JSON.stringify({ accessToken, refreshToken }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: '서버 오류가 발생했습니다.' }), { status: 500 });
  }
}
