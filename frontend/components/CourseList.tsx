import styles from '@/styles/professor-dashboard.module.css';
import Link from 'next/link';

export default async function CourseList({ courses }) {
  if (courses.length === 0) {
    return (
      <Link className={styles.courseLink} href={``}>
        <div className={styles.courseItem}>수업이 존재하지 않습니다.</div>
      </Link>
    );
  }

  return (
    <div>
      {courses.map((course: string, index: string) => (
        <div key={index}>
          <Link className={styles.courseLink} href={`detail/${encodeURIComponent(course)}`}>
            <div className={styles.courseItem}>{course}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
