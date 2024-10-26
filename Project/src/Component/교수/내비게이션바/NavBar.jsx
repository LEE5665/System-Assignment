import Image from 'next/image';
import Link from 'next/link';
import logoutImage from '../../../public/logout.png';
import myPageImage from '../../../public/mypage.png';
import styles from './NavBar.module.css';
export default function ProfessorNavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href={'/Professor'} className={styles.brand} title="홈페이지">
          ACW
        </Link>
        <div className={styles.mypageButtons}>
          <Link href={'/Professor/mypage'} className={styles.mypageButton}>
            <Image src={myPageImage} title="마이페이지" alt="마이페이지" width={50} height={50} />
          </Link>

          <Link href={'/LogOut'} className={styles.mypageButton}>
            <Image
              className={styles.mypageButton}
              src={logoutImage}
              title="로그아웃"
              alt="로그아웃"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
