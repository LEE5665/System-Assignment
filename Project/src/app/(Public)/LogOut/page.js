'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // SweetAlert2 모달 띄우기
    MySwal.fire({
      title: '로그아웃 중입니다...',
      text: '잠시만 기다려 주세요.',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    // 쿠키 삭제
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });

    // 쿠키가 삭제되었는지 확인
    const checkCookies = setInterval(() => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      if (!accessToken && !refreshToken) {
        clearInterval(checkCookies); // 확인 타이머 종료
        MySwal.close(); // 로딩 모달 닫기
        router.push('/'); // 홈 페이지로 이동
      }
    }, 500); // 0.5초 간격으로 쿠키 확인
  }, [router]);

  return null;
}
