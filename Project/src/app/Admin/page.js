'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './AdminPage.module.css';

// SweetAlert2 + React 설정
const MySwal = withReactContent(Swal);

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

// 과목 추가 컴포넌트
function CourseForm({
  courseName,
  setCourseName,
  courseCode,
  setCourseCode,
  instructorId,
  handleCourseSubmit,
  handleInstructorIdClick,
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
        <input
          type="text"
          value={instructorId}
          onClick={handleInstructorIdClick}
          required
          readOnly
          placeholder="교수 ID를 선택하세요"
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        과목 추가
      </button>
    </form>
  );
}

// 교수 선택 모달 컴포넌트
function InstructorSelectionModal({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [instructors, setInstructors] = useState([]);

  // 검색어가 변경될 때마다 API 호출
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('/api/admin/getInstructors', {
          params: {
            q: searchTerm, // 검색어를 쿼리 파라미터로 전달
          },
        });
        setInstructors(response.data.instructors);
      } catch (error) {
        console.error('교수 목록을 불러오는 중 오류가 발생했습니다.', error);
      }
    };

    // 디바운싱을 적용하여 너무 자주 호출되지 않도록 함
    const debounceTimeout = setTimeout(() => {
      fetchInstructors();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.instructorList}>
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <li
              key={instructor.Number}
              className={styles.listItem}
              onClick={() => onSelect(instructor)} // 교수 선택 시 동작
            >
              {instructor.name} ({instructor.Number})
            </li>
          ))
        ) : (
          <p>교수 목록이 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

// 메인 컴포넌트
export default function AdminPage() {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructorId, setInstructorId] = useState('');
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
        MySwal.fire({
          icon: 'error',
          title: '오류',
          text: '과목을 불러오는 중 오류가 발생했습니다.',
        });
      }
    }
    fetchCourses();
  }, []);

  const fetchSections = async (courseId) => {
    try {
      const response = await axios.get(`/api/admin/getClass?courseId=${courseId}`);
      // 데이터가 제대로 있는지 확인
      if (response.data && response.data.sections) {
        setSections(response.data.sections);
      } else {
        setSections([]); // 응답이 비어 있을 경우 빈 배열로 설정
        MySwal.fire({
          icon: 'warning',
          title: '경고',
          text: '반 목록이 없습니다.',
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '반을 불러오는 중 오류가 발생했습니다.',
      });
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !courseCode || !instructorId) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '모든 필드를 입력해주세요.',
      });
      return;
    }
    try {
      const response = await axios.post('/api/admin/addCourse', {
        courseName,
        courseCode,
        instructorId,
      });
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: '성공',
          text: '과목이 추가되었습니다.',
        });
        setCourses([...courses, response.data.course]); // response.data.course로 수정
        setCourseName('');
        setCourseCode('');
        setInstructorId('');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '과목 추가 중 오류가 발생했습니다.',
      });
    }
  };

  const handleInstructorIdClick = async () => {
    let root;
    await MySwal.fire({
      title: '교수 선택',
      html: '<div id="instructor-selection-modal"></div>',
      showConfirmButton: false,
      width: '600px',
      didOpen: () => {
        const modalContainer = document.getElementById('instructor-selection-modal');
        if (modalContainer) {
          root = createRoot(modalContainer);
          root.render(
            <InstructorSelectionModal
              onSelect={(instructor) => {
                setInstructorId(instructor.Number);
                MySwal.close();
              }}
            />
          );
        }
      },
      willClose: () => {
        if (root) {
          root.unmount();
        }
      },
    });
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    if (!grade || !className || !minhour || !maxhour || !selectedCourse) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '모든 필드를 입력해주세요.',
      });
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
        MySwal.fire({
          icon: 'success',
          title: '성공',
          text: '반이 추가되었습니다.',
        });
        setSections([...sections, response.data.section]); // response.data.section으로 수정
        setGrade('');
        setClassName('');
        setMinhour('');
        setMaxhour('');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '반 추가 중 오류가 발생했습니다.',
      });
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !selectedSection) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '모든 필드를 입력해주세요.',
      });
      return;
    }

    try {
      const response = await axios.post('/api/admin/addStudent', {
        sectionId: selectedSection.id,
        studentId,
      });
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: '성공',
          text: '학생이 추가되었습니다.',
        });
        setStudentId('');
      }
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: '오류',
        text: '학생 추가 중 오류가 발생했습니다.',
      });
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
        handleCourseSubmit={handleCourseSubmit}
        handleInstructorIdClick={handleInstructorIdClick}
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

      {sections.length > 0 ? (
        sections.map((section) => (
          <li key={section.id} onClick={() => setSelectedSection(section)} className={styles.sectionItem}>
            {section.grade ? `${section.grade} 학년, ${section.className} 반` : '학년 정보 없음'}
          </li>
        ))
      ) : (
        <p>반 목록이 없습니다.</p>
      )}

      {selectedSection && (
        <StudentForm studentId={studentId} setStudentId={setStudentId} handleStudentSubmit={handleStudentSubmit} />
      )}
    </div>
  );
}
