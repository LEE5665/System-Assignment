import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return new Response(JSON.stringify({ accessToken: newAccessToken }), { status: 200 });
  } catch (error) {
    console.error('유효하지 않은 토큰:', error);
    return new Response(JSON.stringify({ error: '유효하지 않은 토큰' }), { status: 401 });
  }
}