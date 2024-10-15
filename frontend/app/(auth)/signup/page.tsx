'use client';

import styles from '@/styles/SignUpForm.module.css';
import { useState } from 'react';

export default function SignUpForm({ signup }: { signup: (formData: FormData) => Promise<void> }) {
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>회원가입</h2>
      <form action={signup}>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>
            역할 선택:
          </label>
          <select id="role" className={styles.select} value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">학생</option>
            <option value="teacher">교수</option>
          </select>
        </div>

        {role === 'student' ? (
          <div className={styles.formGroup}>
            <label htmlFor="studentId" className={styles.label}>
              학번 (9자리 숫자):
            </label>
            <input type="text" id="studentId" name="studentId" pattern="\d{9}" className={styles.input} required />
          </div>
        ) : (
          <div className={styles.formGroup}>
            <label htmlFor="teacherId" className={styles.label}>
              교번 (6자리 숫자):
            </label>
            <input type="text" id="teacherId" name="teacherId" pattern="\d{6}" className={styles.input} required />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            이름:
          </label>
          <input type="text" id="name" name="name" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dob" className={styles.label}>
            생년월일:
          </label>
          <input type="date" id="dob" name="dob" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            전화번호:
          </label>
          <input type="tel" id="phone" name="phone" pattern="\d{10,11}" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            이메일:
          </label>
          <input type="email" id="email" name="email" className={styles.input} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={styles.input}
            required
          />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>

        <button
          type="submit"
          className={password !== confirmPassword ? styles.buttonDisabled : styles.button}
          disabled={password !== confirmPassword}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
