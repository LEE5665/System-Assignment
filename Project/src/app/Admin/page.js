'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './AdminPage.module.css';

// 과목 추가 컴포넌트
function CourseForm({
  courseName,
  setCourseName,
  courseCode,
  setCourseCode,
  instructorId,
  setInstructorId,
  handleCourseSubmit,
  error,
  success,
}) {
  return (
    <form onSubmit={handleCourseSubmit} className={styles.form}>
      <h2>과목 추가</h2>
      <div className={styles.inputGroup}>
        <label>과목명</label>
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label>과목 코드</label>
        <input type="text" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label>교수 ID</label>
        <input type="text" value={instructorId} onChange={(e) => setInstructorId(e.target.value)} required />
      </div>
      <button type="submit" className={styles.submitButton}>
        과목 추가
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </form>
  );
}

// 반 추가 컴포넌트
function SectionForm({
  grade,
  setGrade,
  className,
  setClassName,
  minhour,
  setMinhour,
  maxhour,
  setMaxhour,
  handleSectionSubmit,
}) {
  return (
    <form onSubmit={handleSectionSubmit} className={styles.form}>
      <h2>반 추가</h2>
      <div className={styles.inputGroup}>
        <label>학년</label>
        <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label>반</label>
        <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label>시작 교시</label>
        <input type="number" value={minhour} onChange={(e) => setMinhour(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label>종료 교시</label>
        <input type="number" value={maxhour} onChange={(e) => setMaxhour(e.target.value)} required />
      </div>
      <button type="submit" className={styles.submitButton}>
        반 추가
      </button>
    </form>
  );
}

// 학생 추가 컴포넌트
function StudentForm({ studentId, setStudentId, handleStudentSubmit }) {
  return (
    <form onSubmit={handleStudentSubmit} className={styles.form}>
      <h2>학생 추가</h2>
      <div className={styles.inputGroup}>
        <label>학생 ID</label>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
      </div>
      <button type="submit" className={styles.submitButton}>
        학생 추가
      </button>
    </form>
  );
}

// 메인 컴포넌트
export default function AddCoursePage() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');
  const [className, setClassName] = useState('');
  const [minhour, setMinhour] = useState('');
  const [maxhour, setMaxhour] = useState('');

  // 과목 목록 불러오기
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('/api/admin/getCourse');
        setCourses(response.data.courses);
      } catch (error) {
        setError('과목을 불러오는 중 오류가 발생했습니다.');
      }
    }
    fetchCourses();
  }, []);

  const fetchSections = async (courseId) => {
    try {
      const response = await axios.get(`/api/admin/getClass?courseId=${courseId}`);
      setSections(response.data.sections);
    } catch (error) {
      setError('반을 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseCode || !instructorId) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/admin/addCourse', {
        courseName,
        courseCode,
        instructorId,
      });
      if (response.status === 200) {
        setSuccess('과목이 추가되었습니다.');
        setCourses([...courses, response.data]);
        setCourseName('');
        setCourseCode('');
        setInstructorId('');
      }
    } catch (error) {
      setError('과목 추가 중 오류가 발생했습니다.');
    }
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!grade || !className || !minhour || !maxhour || !selectedCourse) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('/api/admin/addClass', {
        courseId: selectedCourse.id,
        grade,
        className,
        minhour,
        maxhour,
      });
      if (response.status === 200) {
        setSuccess('반이 추가되었습니다.');
        setSections([...sections, response.data]);
        setGrade('');
        setClassName('');
        setMinhour('');
        setMaxhour('');
      }
    } catch (error) {
      setError('반 추가 중 오류가 발생했습니다.');
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !selectedSection) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post('/api/admin/addStudent', {
        sectionId: selectedSection.id,
        studentId,
      });
      if (response.status === 200) {
        setSuccess('학생이 추가되었습니다.');
        setStudentId('');
      }
    } catch (error) {
      setError('학생 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <CourseForm
        courseName={courseName}
        setCourseName={setCourseName}
        courseCode={courseCode}
        setCourseCode={setCourseCode}
        instructorId={instructorId}
        setInstructorId={setInstructorId}
        handleCourseSubmit={handleCourseSubmit}
        error={error}
        success={success}
      />

      <h3>기존 과목 목록</h3>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li
            key={course.id}
            onClick={() => {
              setSelectedCourse(course);
              fetchSections(course.id);
            }}
            className={styles.courseItem}
          >
            {course.courseName} ({course.courseCode})
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <SectionForm
          grade={grade}
          setGrade={setGrade}
          className={className}
          setClassName={setClassName}
          minhour={minhour}
          setMinhour={setMinhour}
          maxhour={maxhour}
          setMaxhour={setMaxhour}
          handleSectionSubmit={handleSectionSubmit}
        />
      )}

      {sections.length > 0 && (
        <>
          <h3>{selectedCourse.courseName}에 속한 반</h3>
          <ul className={styles.sectionList}>
            {sections.map((section) => (
              <li key={section.id} onClick={() => setSelectedSection(section)} className={styles.sectionItem}>
                {section.grade} 학년, {section.className} 반
              </li>
            ))}
          </ul>
        </>
      )}

      {selectedSection && (
        <StudentForm studentId={studentId} setStudentId={setStudentId} handleStudentSubmit={handleStudentSubmit} />
      )}
    </div>
  );
}
