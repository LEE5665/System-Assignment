import SNavBar from '@/components/sign-nav-bar';
import styles from '@/styles/Layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.content}>
      <SNavBar />
      {children}
    </div>
  );
}
