'use client';
import { useState } from 'react';
import { attendanceData, subjectData } from '../../../temp/temp.data';
import styles from './DashBoard.module.css';
import AttendanceStatus from './디테일/AttendanceStatus';

export default function DashBoard() {
  const [openSubject, setOpenSubject] = useState(null);

  const handleToggleDropdown = (id) => {
    setOpenSubject(openSubject === id ? null : id);
  };

  return (
    <div className={styles.dashboard}>
      {attendanceData.map((attendance) => {
        const subject = subjectData.find((sub) => sub.id === attendance.id);
        if (!subject) return null;

        const totalPresent = attendance.data.filter((d) => d.type === '정상').length;
        const totalLate = attendance.data.filter((d) => d.type === '지각').length;
        const totalAbsent = attendance.data.filter((d) => d.type === '결석').length;

        return (
          <div key={subject.id} className={styles.subjectContainer}>
            <button
              onClick={() => handleToggleDropdown(subject.id)}
              className={styles.subjectButton}
              aria-expanded={openSubject === subject.id}
            >
              {subject.title} - {subject.grade}학년 {subject.class}반
              <span className={styles.attendanceInfo}>
                출석: {totalPresent} | 지각: {totalLate} | 결석: {totalAbsent}
              </span>
              <span className={styles.arrow}>{openSubject === subject.id ? '▲' : '▼'}</span>
            </button>

            {openSubject === subject.id && (
              <div className={styles.dropdown}>
                <AttendanceStatus attendanceData={attendance.data} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
