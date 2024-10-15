import styles from '@/styles/unsign-nav-bar.module.css';
import Link from 'next/link';

export default async function UNavBar() {
  //쿠키에서 불러올 값
  return (
    <nav className={styles.navbar}>
      <Link href={'/'} title="홈으로 가기" className={styles.title}>
        학교명
      </Link>
      <div className={styles.div}>
        <Link href={'/signin'} className={styles.button}>
          로그인
        </Link>
        <Link href={'/signup'} className={styles.button}>
          회원가입
        </Link>
      </div>
    </nav>
  );
}
