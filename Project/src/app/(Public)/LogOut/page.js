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
    // SweetAlert2 모달 띄우기 (로그아웃 중 메시지)
    MySwal.fire({
      title: '로그아웃 중입니다...',
      text: '잠시만 기다려 주세요.',
      showConfirmButton: false, // 확인 버튼 숨기기
      allowOutsideClick: false, // 모달 외부 클릭 방지
      allowEscapeKey: false, // ESC 키 방지
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    // 쿠키 삭제
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });

    // 0.5초 후 쿠키가 삭제되었는지 확인
    setTimeout(() => {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      if (!accessToken && !refreshToken) {
        // SweetAlert2 모달 업데이트 (로그아웃 성공 메시지)
        MySwal.fire({
          icon: 'success',
          title: '로그아웃 성공',
          text: '성공적으로 로그아웃되었습니다.',
          showConfirmButton: false, // 확인 버튼 숨기기
          timer: 1000, // 1초 후 모달 자동 닫기
        }).then(() => {
          router.push('/Login'); // 홈 페이지로 이동
        });
      } else {
        // 쿠키가 여전히 남아있을 때 추가 처리가 필요할 수 있습니다.
        MySwal.fire({
          icon: 'error',
          title: '로그아웃 실패',
          text: '쿠키 삭제에 실패했습니다. 다시 시도해주세요.',
          showConfirmButton: true,
        });
      }
    }, 500); // 0.5초 대기 후 확인
  }, [router]);

  return null;
}
