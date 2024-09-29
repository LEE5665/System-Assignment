import CourseList from '@/components/CourseList';
import styles from '@/styles/professor-dashboard.module.css';
export async function generateMetadata() {
  return {
    // fetch해올 값
    title: `${'차민준'}교수님`,
  };
}
export default async function Page() {
  // fetch해올 값
  const courses = [
    '정보보안',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
    '운영체제',
    'JAVA프로그래밍',
    'S/W 프로젝트',
  ];

  return (
    <div className={styles.container}>
      <span className={styles.title}>수업을 선택해주세요.</span>
      <div className={styles.courseList}>
        <CourseList courses={courses} />
      </div>
    </div>
  );
}
