'use client';
import { useState } from 'react';
import styles from './AttendanceTable.module.css';

const STATUS = {
  '-1': { label: '기본', color: 'default' },
  1: { label: '정상 출석', color: 'green' },
  2: { label: '지각', color: 'yellow' },
  3: { label: '결석', color: 'red' },
};

export default function AttendanceTable({ data }) {
  const [statuses, setStatuses] = useState(data.reduce((acc, cur) => ({ ...acc, [cur.id]: -1 }), {}));

  const handleClick = (id) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: prevStatuses[id] === -1 ? 1 : (prevStatuses[id] + 1) % 4 || 1,
    }));
  };

  return (
    <div className={styles.table}>
      {data.map((student) => {
        const currentStatus = statuses[student.id] ?? -1;
        return (
          <button
            key={student.id}
            className={`${styles.cell} ${styles[STATUS[currentStatus]?.color]}`}
            onClick={() => handleClick(student.id)}
          >
            <div>{student.number}</div>
            <div>{student.name}</div>
          </button>
        );
      })}
    </div>
  );
}
