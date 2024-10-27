'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './NotFound.module.css';

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>존재하지 않는 페이지입니다.</p>
      <p className={styles.redirectMessage}>홈으로 이동 중입니다...</p>
    </div>
  );
}
