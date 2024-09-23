'use client';

import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      code,
      password,
      redirect: false, // redirect를 false로 설정하여 커스텀 리다이렉트를 처리
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      // 로그인 성공 후 세션을 가져와서 사용자 역할에 따라 라우팅
      const session = await getSession();
      if (session?.user.role === 'professor') {
        router.push('/professor');
      } else if (session?.user.role === 'student') {
        router.push('/student');
      }
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Code:
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
