'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './DashBoard.module.css';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function DashBoard({ data }) {
  const accessToken = Cookies.get('accessToken');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);

  async function validateToken(accessToken) {
    try {
      const response = await axios.post(
        `/api/auth/verifyDateToken`,
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
    async function fetchCourses() {
        try {
            const num = await validateToken(accessToken);
            const response = await axios.get(`/api/admin/getCourse?num=${num}`);
            setCourses(response.data.courses);
        } catch (error) {
            console.log("에러!");
        }
    }
    fetchCourses();
}, []);

const fetchSections = async (courseId) => {
  try {
    const response = await axios.get(`/api/admin/getClass?courseId=${courseId}`);
    setSections(response.data.sections); // sections 상태 업데이트
  } catch (error) {
    console.error('반을 불러오는 중 오류가 발생했습니다.', error);
  }
};

// 드롭다운 토글 함수
const toggleDropdown = (courseId) => {
  if (openDropdown === courseId) {
    setOpenDropdown(null);
    setSections([]); // 열려있던 경우 닫으면서 sections 초기화
  } else {
    setOpenDropdown(courseId);
    fetchSections(courseId); // 해당 courseId의 섹션 가져오기
  }
};

  if(!courses){
    return(<div></div>);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.buttonGrid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => toggleDropdown(course.id)}
              aria-expanded={openDropdown === course.id}
              aria-controls={`dropdown-${course.id}`}
            >
              {course.courseName}
              <span className={styles.arrow}>{openDropdown === course.id ? '▲' : '▼'}</span>
            </button>
            {openDropdown === course.id && (
              <div id={`dropdown-${course.id}`} className={styles.dropdown}>
                {sections.map((section) => (
                  <Link key={section.id} href={`/Professor/Detail/${section.id}`} className={styles.link}>
                    <div className={styles.dropdownItem}>
                      {section.grade}학년 - {section.class}반
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
