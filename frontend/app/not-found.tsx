import styles from '@/styles/not-found.module.css';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not found',
};

export default function NotFound() {
  // 서버액션으로 쿠키값 불러와서 어디로 갈지 정하면 될듯
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404</h1>
      <p className={styles.notFoundMessage}>존재하지 않는 페이지입니다.</p>
      <Link href="/">
        <button className={styles.homeButton}>홈으로 돌아가기</button>
      </Link>
    </div>
  );
}
