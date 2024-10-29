'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './Register.module.css';

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [birthdate, setBirthdate] = useState('2000-01-01');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 유효성 검사 함수
  const validateForm = () => {
    const studentIdRegex = /^\d{9}$/; // 학번: 숫자 9자리
    const professorIdRegex = /^\d{6}$/; // 교번: 숫자 6자리
    const phoneRegex = /^010-\d{4}-\d{4}$/; // 전화번호: 010-####-####
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식
    const passwordRegex = /^.{8,20}$/; // 비밀번호: 8자리 이상, 20자리 이하

    if (isStudent && !studentIdRegex.test(id)) {
      setError('학번은 9자리 숫자여야 합니다.');
      return false;
    }

    if (!isStudent && !professorIdRegex.test(id)) {
      setError('교번은 6자리 숫자여야 합니다.');
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError('전화번호는 010-####-#### 형식이어야 합니다.');
      return false;
    }

    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError('비밀번호는 8자리 이상, 20자리 이하여야 합니다.');
      return false;
    }

    setError(''); // 모든 유효성 검사를 통과하면 에러 메시지 초기화
    return true;
  };

  // 전화번호 입력을 자연스럽게 포맷팅하는 함수
  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // 숫자 이외의 문자는 제거
    let formattedPhone = input;

    if (input.length > 3 && input.length <= 7) {
      formattedPhone = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
      formattedPhone = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(7, 11)}`;
    }

    setPhone(formattedPhone);
  };

  // 학번/교번 입력을 자리 수에 맞게 제한하는 함수
  const handleIdChange = (e) => {
    const input = e.target.value;
    const maxLength = isStudent ? 9 : 6; // 학번은 9자리, 교번은 6자리 제한

    // 입력값이 숫자가 아닌 경우 처리하지 않고 이전 값을 유지
    if (!/^\d*$/.test(input)) {
      return;
    }

    // 입력 값이 길이 제한을 초과하지 않도록 처리
    if (input.length <= maxLength) {
      setId(input);
    }
  };

  // 학번/교번 입력을 라디오에 따라 초기화
  const handleRadioChange = (e) => {
    setIsStudent(e.target.value === 'student');
    setId('');
  };

  // 비밀번호 처리
  const handlePasswordChange = (e) => {
    const input = e.target.value.trim(); // 공백 제거
    if (input.length <= 20) {
      setPassword(input); // 자리 수 넘으면 더 이상 입력되지 않도록 처리
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // 로딩 시작

    // 로딩 모달 표시
    MySwal.fire({
      title: '회원가입 중...',
      text: '잠시만 기다려 주세요.',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      const response = await axios.post('/api/auth/register', {
        id,
        password,
        isStudent,
        birthdate,
        phone,
        email,
        name,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken, {
          expires: 1 / 24,
          path: '/',
          secure: true,
          sameSite: 'lax',
        });

        Cookies.set('refreshToken', refreshToken, {
          expires: 7,
          path: '/',
          secure: true,
          sameSite: 'lax',
        });

        // 로딩 모달 닫기
        MySwal.close();

        // 성공 메시지 표시
        await MySwal.fire({
          icon: 'success',
          title: '회원가입 성공!',
          text: '회원가입이 완료되었습니다.',
        });

        // 페이지 이동
        if (isStudent) {
          router.push('/Student');
        } else {
          router.push('/Professor');
        }

        // 폼 필드 초기화 (선택 사항)
        setId('');
        setPassword('');
        setName('');
        setBirthdate('2000-01-01');
        setPhone('');
        setEmail('');
      }
    } catch (error) {
      // 로딩 모달 닫기
      MySwal.close();

      // 실패 시 에러 메시지 표시
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';
      MySwal.fire({
        icon: 'error',
        title: '회원가입 실패',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

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
            onChange={handleIdChange}
            className={styles.input}
            required
            autoComplete="off"
            placeholder={isStudent ? '9자리 숫자' : '6자리 숫자'}
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
            onChange={handlePasswordChange}
            required
            className={styles.input}
            autoComplete="off"
            placeholder="8자리 이상 20자리 이하"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            이름
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
            생년월일
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
            onChange={handlePhoneChange}
            required
            className={styles.input}
            placeholder="010-####-####"
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
            placeholder="example@example.com"
          />
        </div>

        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="student"
              checked={isStudent}
              onChange={handleRadioChange}
              className={styles.radioInput}
            />
            학생
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="role"
              value="professor"
              checked={!isStudent}
              onChange={handleRadioChange}
              className={styles.radioInput}
            />
            교수
          </label>
        </div>

        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? '처리 중...' : '회원가입'}
        </button>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
