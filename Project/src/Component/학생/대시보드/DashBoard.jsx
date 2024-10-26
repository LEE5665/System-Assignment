'use client';
import { useState } from 'react';
import { attendanceData, subjectData } from '../../../temp/temp.data';
import styles from './DashBoard.module.css';

function getAttendanceSummary(attendance) {
  const summary = {
    정상: 0,
    지각: 0,
    결석: 0,
  };

  attendance.forEach((entry) => {
    summary[entry.type] += 1;
  });

  return summary;
}

export default function AttendanceSummary() {
  const [openSubject, setOpenSubject] = useState(null);

  const handleToggleDropdown = (id) => {
    setOpenSubject(openSubject === id ? null : id);
  };

  return (
    <div className={styles.attendanceSummary}>
      {attendanceData.map((attendance) => {
        const subject = subjectData.find((sub) => sub.id === attendance.id);
        const summary = getAttendanceSummary(attendance.data);

        if (!subject) return null;

        return (
          <div key={subject.id} className={styles.subjectContainer}>
            <button
              onClick={() => handleToggleDropdown(subject.id)}
              className={styles.subjectButton}
              aria-expanded={openSubject === subject.id}
            >
              <div className={styles.subjectInfo}>
                {subject.title} - {subject.grade}학년 {subject.class}반
              </div>
              <div className={styles.attendanceInfo}>
                출석: {summary['정상']} | 지각: {summary['지각']} | 결석: {summary['결석']}
              </div>
              <span className={styles.arrow}>{openSubject === subject.id ? '▲' : '▼'}</span>
            </button>

            {openSubject === subject.id && (
              <div className={styles.dropdown}>
                <div className={styles.attendanceDetails}>
                  {attendance.data.map((weekInfo) => (
                    <div key={weekInfo.week}>
                      {weekInfo.week}주차: {weekInfo.type}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
