'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../../Component/계정/로그인/Login.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function RegisterPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isStudent, setIsStudent] = useState(true);
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id || !password) {
            setError('아이디, 비밀번호가 없습니다.');
            return;
        }
        console.log("no");
        try {
            const response = await axios.post('/api/auth/register', {id, password, isStudent, birthdate, phone, email, name});
            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data;
                Cookies.set('accessToken', accessToken, {
                    expires: 1/24,
                    path: '/',
                    secure: true,
                    sameSite: 'lax'
                });
    
                Cookies.set('refreshToken', refreshToken, {
                    expires: 7,
                    path: '/',
                    secure: true,
                    sameSite: 'lax'
                });
                alert("일단 회원가입됨 쿠키추가해줘야지 :)");
                if (isStudent) {
                    router.push('/Student');
                } else {
                    router.push('/Professor');
                }
            }
        } catch (error) {
            setError('오류');
        }
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.title}>회원가입</div>
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
                <div className={styles.formGroup}>
                    <label htmlFor="birthdate" className={styles.label}>
                        생일
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                        autoComplete="off"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="birthdate" className={styles.label}>
                        생일
                    </label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                        className={styles.input}
                        autoComplete="off"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                        핸드폰번호
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={styles.input}
                        autoComplete="off"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        이메일
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    회원가입
                </button>
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </div>
    );
}
