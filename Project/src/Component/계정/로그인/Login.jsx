'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './Login.module.css';

const MySwal = withReactContent(Swal);

export default function LoginComponent({ login }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const router = useRouter();

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

  const handlePasswordChange = (e) => {
    const input = e.target.value.trim(); // 공백 제거
    if (input.length <= 20) {
      setPassword(input); // 자리 수 넘으면 더 이상 입력되지 않도록 처리
    }
  };

  // 학번/교번 입력을 라디오에 따라 초기화
  const handleRadioChange = (e) => {
    setIsStudent(e.target.value === 'student');
    setId(''); // 라디오 버튼 변경 시 학번/교번 입력 필드를 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // 로그인 중 로딩 창을 표시
    MySwal.fire({
      title: '로그인 중...',
      text: '잠시만 기다려 주세요.',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    try {
      // 서버로 로그인 요청을 보냅니다
      const response = await axios.post('/api/auth/login', {
        id,
        password,
        isStudent,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          sameSite: 'Lax',
          expires: 1 / 24,
        });
        Cookies.set('refreshToken', refreshToken, {
          httpOnly: false,
          secure: true,
          path: '/',
          sameSite: 'Lax',
          expires: 7,
        });

        // 로그인 성공 메시지 표시
        MySwal.fire({
          icon: 'success',
          title: '로그인 성공',
          text: '성공적으로 로그인되었습니다.',
        }).then(() => {
          if (id === 'admin') {
            router.push('/Admin');
          } else if (isStudent) {
            router.push('/Student');
          } else {
            router.push('/Professor');
          }
        });
      } else {
        MySwal.fire({
          icon: 'error',
          title: '로그인 실패',
          text: '로그인에 실패했습니다. 다시 시도하세요.',
        });
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      MySwal.fire({
        icon: 'error',
        title: '오류 발생',
        text: '서버와 연결할 수 없습니다. 다시 시도하세요.',
      });
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
            onChange={handleIdChange}
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
            onChange={handlePasswordChange}
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
              onChange={handleRadioChange}
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
              onChange={handleRadioChange}
              className={styles.radioInput}
            />
            교수 로그인
          </label>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button}>
          로그인
        </button>
        <Link href={'/Register'} className={styles.registerLink}>
          회원가입
        </Link>
      </form>
    </div>
  );
}
