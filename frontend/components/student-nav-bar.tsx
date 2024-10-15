import styles from '@/styles/nav-bar.module.css';
import Link from 'next/link';

export default async function SNavBar() {
  //쿠키에서 불러올 값
  const student_name = '차민준';
  return (
    <nav className={styles.navbar}>
      <div className={styles.userInfo}>
        <Link href={'/student/dashboard'} title="대시보드">
          {student_name}학생
        </Link>
      </div>
      <Link href={'/signout'} className={styles.logoutButton}>
        로그아웃
      </Link>
    </nav>
  );
}
