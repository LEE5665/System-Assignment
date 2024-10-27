'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginComponent({ login }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setError('아이디, 비밀번호가 없습니다.');
      return;
    }
    try {
      // 서버로 로그인 요청을 보냅니다
      const response = await axios.post('/api/auth/login', {
        id,
        password,
        isStudent,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken, role } = response.data;
        Cookies.set('accessToken', accessToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          sameSite: 'Lax',
          expires: 1/24,
        });
        Cookies.set('refreshToken', refreshToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          sameSite: 'Lax',
          expires: 7,
        });
        router.push('/');
      } else {
        setError('로그인에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setError('서버와 연결할 수 없습니다. 다시 시도하세요.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.title}>로그인 페이지</div>
        <div className={styles.formGroup}>
          <label htmlFor="id" className={styles.label}>
            {isStudent ? '학번' : '교번'}
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={styles.input}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            autoComplete="off"
          />
        </div>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="student"
              checked={isStudent}
              onChange={() => setIsStudent(true)}
              className={styles.radioInput}
            />
            학생 로그인
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="professor"
              checked={!isStudent}
              onChange={() => setIsStudent(false)}
              className={styles.radioInput}
            />
            교수 로그인
          </label>
        </div>
        <button type="submit" className={styles.button}>
          로그인
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
