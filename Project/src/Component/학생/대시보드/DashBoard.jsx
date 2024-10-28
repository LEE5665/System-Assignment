'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashBoard.module.css';
import AttendanceStatus from './디테일/AttendanceStatus';
import Cookies from 'js-cookie';

export default function DashBoard() {
    const accessToken = Cookies.get('accessToken');
    const [sections, setSections] = useState([]);
    const [openSubject, setOpenSubject] = useState(null);

    async function validateToken(accessToken) {
      try {
        const response = await axios.post(
          `/api/auth/verifyDataToken`,
          { token: accessToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 200) {
          const decoded = response.data.decoded;
          if (decoded) {
            return decoded.userId;;
          }
          return null;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Failed to validate access token:', error);
        return null;
      }
    }

    useEffect(() => {
        async function fetchSections() {
            try {
                const num = await validateToken(accessToken);
                const response = await axios.get(`/api/Student/getStatus?num=${num}`);
                setSections(response.data);
            } catch (error) {
                console.error("Error fetching sections:", error);
            }
        }

        fetchSections();
    }, []);

    const handleToggleDropdown = (id) => {
        setOpenSubject(openSubject === id ? null : id);
    };

    return (
      <div className={styles.dashboard}>
      {sections.map((section) => {
          let totalPresent = 0, totalLate = 0, totalAbsent = 0, totalUnchecked = 0;

          // 주차별 요약 계산
          for (const week in section.attendanceData) {
              for (const period in section.attendanceData[week]) {
                  const status = parseInt(section.attendanceData[week][period].status);
                  if (status === 1) totalPresent++;
                  else if (status === 2) totalLate++;
                  else if (status === 3) totalAbsent++;
                  else totalUnchecked++;
              }
          }

                return (
                    <div key={section.id} className={styles.subjectContainer}>
                        <button
                            onClick={() => handleToggleDropdown(section.id)}
                            className={styles.subjectButton}
                            aria-expanded={openSubject === section.id}
                        >
                            {section.title} - {section.grade}학년 {section.class}반
                            <span className={styles.attendanceInfo}>
                                출석: {totalPresent} | 지각: {totalLate} | 결석: {totalAbsent}
                                {/* | 출결 전: {totalUnchecked} */}
                            </span>
                            <span className={styles.arrow}>{openSubject === section.id ? '▲' : '▼'}</span>
                        </button>

                        {openSubject === section.id && (
                            <div className={styles.dropdown}>
                                <AttendanceStatus attendanceData={section.attendanceData} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
