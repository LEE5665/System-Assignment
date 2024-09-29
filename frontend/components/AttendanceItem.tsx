'use client';
import styles from '@/styles/AttendanceItem.module.css';
export default function AttendanceItem({ id, name, clickEvent, color }) {
  return (
    <div onClick={clickEvent} className={`${styles.attendanceItem} ${styles[color]}`}>
      <span>{id}</span>
      <br />
      <span>{name}</span>
    </div>
  );
}
