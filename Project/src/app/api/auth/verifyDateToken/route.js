import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { token } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return new Response(JSON.stringify({ decoded }), { status: 200 });
  } catch (error) {
    console.error('유효하지 않은 토큰:', error);
    return new Response(JSON.stringify({ error: '유효하지 않은 토큰' }), { status: 401 });
  }
}