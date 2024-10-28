'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminPage.module.css';

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

    // 선택한 과목의 반 목록 불러오기
    const fetchSections = async (courseId) => {
        try {
            const response = await axios.get(`/api/admin/getClass?courseId=${courseId}`);
            setSections(response.data.sections);
        } catch (error) {
            setError('반을 불러오는 중 오류가 발생했습니다.');
        }
    };

    // 과목 추가
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

    // 반 추가
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

    // 학생 추가
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
            {/* 과목 추가 폼 */}
            <form onSubmit={handleCourseSubmit} className={styles.form}>
                <h2>과목 추가</h2>
                <label>과목명</label>
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                />
                <label>과목 코드</label>
                <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                />
                <label>교수 ID</label>
                <input
                    type="text"
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    required
                />
                <button type="submit">과목 추가</button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
            </form>

            {/* 과목 목록 */}
            <h3>기존 과목 목록</h3>
            <ul>
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

            {/* 선택된 과목에 대한 반 추가 폼 */}
            {selectedCourse && (
                <form onSubmit={handleSectionSubmit} className={styles.form}>
                    <h2>{selectedCourse.courseName} 반 추가</h2>
                    <label>학년</label>
                    <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                    <label>반</label>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                    />
                    <label>시작 교시</label>
                    <input
                        type="number"
                        value={minhour}
                        onChange={(e) => setMinhour(e.target.value)}
                        required
                    />
                    <label>종료 교시</label>
                    <input
                        type="number"
                        value={maxhour}
                        onChange={(e) => setMaxhour(e.target.value)}
                        required
                    />
                    <button type="submit">반 추가</button>
                </form>
            )}

            {/* 선택된 과목의 반 목록 */}
            {sections.length > 0 && (
                <>
                    <h3>{selectedCourse.courseName}에 속한 반</h3>
                    <ul>
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                onClick={() => setSelectedSection(section)}
                                className={styles.sectionItem}
                            >
                                {section.grade} 학년, {section.class} 반
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* 학생 추가 폼 */}
            {selectedSection && (
                <form onSubmit={handleStudentSubmit} className={styles.form}>
                    <h2>{selectedSection.grade}학년 {selectedSection.class} 반 학생 추가</h2>
                    <label>학생 ID</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />
                    <button type="submit">학생 추가</button>
                </form>
            )}
        </div>
    );
}
