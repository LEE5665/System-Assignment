'use client';
import { useState } from 'react';
import styles from './AttendanceTable.module.css';

const STATUS = {
  '-1': { label: '기본', color: 'default' },
  1: { label: '정상 출석', color: 'green' },
  2: { label: '지각', color: 'yellow' },
  3: { label: '결석', color: 'red' },
};

export default function AttendanceTable({ SaveInfo, data, subjectData, weekNumber }) {
  const [statuses, setStatuses] = useState(data.reduce((acc, cur) => ({ ...acc, [cur.id]: -1 }), {}));
  const [week, setWeek] = useState(weekNumber);

  const handleClick = (id) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: prevStatuses[id] === -1 ? 1 : (prevStatuses[id] + 1) % 4 || 1,
    }));
  };

  const markAllAsPresent = () => {
    const newStatuses = data.reduce((acc, cur) => ({ ...acc, [cur.id]: 1 }), {});
    setStatuses(newStatuses);
  };

  const saveAttendance = async () => {
    if (!Object.values(statuses).some((status) => status === -1)) {
      const result = await SaveInfo(statuses);
      if (result) {
        alert('출석이 저장되었습니다.');
      } else {
        alert('출석 저장에 실패했습니다.');
      }
    } else {
      alert('아직 체크되지 않은 학생이 있습니다.');
    }
  };

  const handleWeekChange = (event) => {
    setWeek(event.target.value);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.subjectInfo}>
          {`${subjectData.title} - ${subjectData.grade}학년 ${subjectData.class}반 `}
          <select value={week} onChange={handleWeekChange} className={styles.dropdown}>
            {Array.from({ length: 15 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}주차
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttons}>
          <button onClick={markAllAsPresent} className={styles.actionButton}>
            모두 출석
          </button>
          <button onClick={saveAttendance} className={styles.actionButton}>
            출석 저장
          </button>
        </div>
      </div>
      <div className={styles.table}>
        {data.map((student) => {
          const currentStatus = statuses[student.id] ?? -1;
          return (
            <button
              key={student.id}
              className={`${styles.cell} ${styles[STATUS[currentStatus]?.color]}`}
              onClick={() => handleClick(student.id)}
            >
              <div>{student.id}</div>
              <div>{student.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
