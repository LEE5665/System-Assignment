'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Login.module.css';

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

    const response = await login({ id: id, password: password });

    if (response == null) {
      setError('로그인에 실패했습니다. 다시 시도하세요.');
    } else if (response == '학생') {
      router.push('/Student');
    } else if (response == '교수') {
      router.push('/Professor');
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
