'use client';
import styles from '@/styles/Attendance.module.css';
import { useState } from 'react';
import AttendanceItem from './AttendanceItem';

export default function AttendanceTable({ datas }: { datas: ProfDetailParms }) {
  const [checks, setChecks] = useState<{ [key: string]: number }>({});

  const handleClick = (id: string) => {
    setChecks((prevChecks) => ({
      ...prevChecks,
      [id]: ((prevChecks[id] || 0) % 3) + 1,
    }));
  };

  const saveAndFetchData = () => {
    alert('저장');
    window.location.href = '/professor/dashboard';
  };

  const handleSetAllToOne = () => {
    const newChecks: { [key: string]: number } = {};
    datas.students.forEach((student) => {
      newChecks[student[0]] = 1;
    });
    setChecks(newChecks);
  };

  const getColor = (checkValue: number = 0) => {
    if (checkValue === 0) return 'NoChoice';
    switch (checkValue) {
      case 1:
        return 'present'; // 초록색
      case 2:
        return 'tardy'; // 노란색
      case 3:
        return 'absent'; // 빨간색
      default:
        return 'NoChoice'; // 기본값
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span>
          {datas.class_name} - {datas.week}주차 강의
        </span>
        <span onClick={handleSetAllToOne}>모두 출석</span>
        <span onClick={saveAndFetchData}>출석 저장</span>
      </div>
      <div className={styles.table}>
        {datas.students.map((student) => (
          <AttendanceItem
            key={student[0]}
            id={student[0]}
            name={student[1]}
            clickEvent={() => handleClick(student[0])}
            color={getColor(checks[student[0]])}
          />
        ))}
      </div>
    </div>
  );
}
