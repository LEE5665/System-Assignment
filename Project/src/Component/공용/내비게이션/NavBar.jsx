import Image from 'next/image';
import Link from 'next/link';
import logoutImage from '../../../../public/logout.png';
import myPageImage from '../../../../public/mypage.png';
import getName from '../../../action/getName';
import styles from './NavBar.module.css';

export default async function NavBar({ type }) {
  const name = await getName();
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`/${type}`} className={styles.brand} title='홈페이지'>
          ACW
        </Link>
        <div className={styles.mypageButtons}>
          <span className={styles.name}>
            {name} {type === 'Professor' ? '교수님' : '학생'}
          </span>
          <Link href={`/${type}/mypage`} className={styles.mypageButton}>
            <Image src={myPageImage} title='마이페이지' alt='마이페이지' width={50} height={50} />
          </Link>
          <Link href={'/LogOut'} className={styles.mypageButton}>
            <Image
              className={styles.mypageButton}
              src={logoutImage}
              title='로그아웃'
              alt='로그아웃'
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
