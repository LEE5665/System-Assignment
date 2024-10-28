'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../../Component/교수/대시보드/디테일/AttendanceTable.module.css';

const STATUS = {
    '-1': { label: '기본', color: 'default' },
    1: { label: '정상 출석', color: 'green' },
    2: { label: '지각', color: 'yellow' },
    3: { label: '결석', color: 'red' },
  };
  
  export default function AttendanceTable({ params: { id } }) {
    const [data, setData] = useState([]);
    const [statuses, setStatuses] = useState({});
    const [subjectInfo, setSubjectInfo] = useState({ sectionName: '', grade: '', class: '', minhour: 1, maxhour: 8 });
    const [weekNumber, setWeekNumber] = useState(1);
    const [period, setPeriod] = useState(1);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get(`/api/Professor/getDetail`, {
            params: { id, week: weekNumber, period }
          });
  
          const { courseName, grade, class: className, minhour, maxhour, students } = response.data;
          setSubjectInfo({
            sectionName: courseName,
            grade,
            class: className,
            minhour,
            maxhour,
          });
          setData(students);
          setStatuses(
            students.reduce((acc, cur) => ({ ...acc, [cur.Number]: cur.status === 'N/A' ? -1 : cur.status }), {})
          );
        } catch (error) {
          console.error('출석 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
      }
  
      fetchData();
    }, [weekNumber, period]);
  
    const handleClick = (id) => {
      setStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: prevStatuses[id] === -1 ? 1 : (prevStatuses[id] + 1) % 4 || 1,
      }));
    };

    const markAllAsPresent = () => {
      const updatedStatuses = {};
      data.forEach((student) => {
        updatedStatuses[student.Number] = 1;
      });
      setStatuses(updatedStatuses);
    };
  
    const saveAttendance = async () => {
      if (!Object.values(statuses).some((status) => status === -1)) {
        try {
          const response = await axios.post('/api/Professor/setDetail', { statuses, week: weekNumber, period, sectionId: id });
          if (response.status === 200) {
            alert('출석이 저장되었습니다.');
          } else {
            alert('출석 저장에 실패했습니다.');
          }
        } catch (error) {
          console.error('출석 저장 중 오류가 발생했습니다:', error);
          alert('출석 저장 중 오류가 발생했습니다.');
        }
      } else {
        alert('아직 체크되지 않은 학생이 있습니다.');
      }
    };
  
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.subjectInfo}>
            {`${subjectInfo.sectionName} - ${subjectInfo.grade}학년 ${subjectInfo.class}반 `}
            <select value={weekNumber} onChange={(e) => setWeekNumber(parseInt(e.target.value))} className={styles.dropdown}>
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}주차
                </option>
              ))}
            </select>
            <select value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} className={styles.dropdown}>
              {Array.from({ length: subjectInfo.maxhour - subjectInfo.minhour + 1 }, (_, i) => (
                <option key={i + subjectInfo.minhour} value={i + subjectInfo.minhour}>
                  {i + subjectInfo.minhour}교시
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
            const currentStatus = statuses[student.Number] ?? -1;
            return (
              <button
                key={student.Number}
                className={`${styles.cell} ${styles[STATUS[currentStatus]?.color]}`}
                onClick={() => handleClick(student.Number)}
              >
                <div>{student.Number}</div>
                <div>{student.name}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
