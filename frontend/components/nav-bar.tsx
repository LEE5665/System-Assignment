import styles from '@/styles/nav-bar.module.css';

export default async function NavBar() {
  //쿠키에서 불러올 값
  const profssor_name = '차민준';
  return (
    <nav className={styles.navbar}>
      <div className={styles.userInfo}>
        <span>{profssor_name}교수님</span>
      </div>
      <button className={styles.logoutButton}>로그아웃</button>
    </nav>
  );
}
