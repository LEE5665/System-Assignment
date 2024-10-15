import styles from '@/styles/nav-bar.module.css';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getCookieData() {
  'use server';
  const data = JSON.parse(cookies().get('test')?.value);
  return { name: data?.name, isPrf: data?.isPrf };
}

export default async function SNavBar() {
  //쿠키에서 불러올 값
  const data = await getCookieData();
  const name = data.name;
  const isPrf = data.isPrf;
  return (
    <nav className={styles.navbar}>
      <div className={styles.userInfo}>
        {isPrf ? (
          <Link href={'/professor/dashboard'} title="대시보드">
            {name}교수님
          </Link>
        ) : (
          <Link href={'/student/dashboard'} title="대시보드">
            {name}학생
          </Link>
        )}
      </div>
      <Link href={'/signout'} className={styles.logoutButton}>
        로그아웃
      </Link>
    </nav>
  );
}
