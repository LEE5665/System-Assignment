'use client';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SignIn.module.css';

const LoginForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateUserId = (id: string) => /^[0-9]{6,9}$/.test(id);
  const validatePassword = (pwd: string) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/.test(pwd);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateUserId(userId)) {
      setError('아이디는 6~9자리의 숫자여야 합니다.');
      return;
    }
    if (!validatePassword(password)) {
      setError('비밀번호는 8~25자리의 문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }
    //여기에 api 요청해야함
    console.log('로그인 성공:', { userId, password });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>로그인</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="userId" className={styles.label}>
            아이디
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div className={styles.inputContainer}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            <span className={styles.tooltip}>비밀번호 표시</span>
          </div>
        </div>
        <button type="submit" className={styles.button}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
