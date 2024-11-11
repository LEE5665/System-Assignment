import { FaBirthdayCake, FaEnvelope, FaIdBadge, FaPhone, FaUser } from 'react-icons/fa';
import styles from './mypage.module.css';

export default function MyPageComponent({ data }) {
  const label = data.Number.length === 6 ? '교번' : '학번';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>마이 페이지</h2>
      <div className={styles.field}>
        <FaIdBadge className={styles.icon} />
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{data.Number}</span>
      </div>
      <div className={styles.field}>
        <FaUser className={styles.icon} />
        <span className={styles.label}>이름</span>
        <span className={styles.value}>{data.name}</span>
      </div>
      <div className={styles.field}>
        <FaBirthdayCake className={styles.icon} />
        <span className={styles.label}>생년월일</span>
        <span className={styles.value}>{new Date(data.birthDate).toLocaleDateString('ko-KR')}</span>
      </div>
      <div className={styles.field}>
        <FaPhone className={styles.icon} />
        <span className={styles.label}>전화번호</span>
        <span className={styles.value}>{data.phoneNumber}</span>
      </div>
      <div className={styles.field}>
        <FaEnvelope className={styles.icon} />
        <span className={styles.label}>이메일</span>
        <span className={styles.value}>{data.email}</span>
      </div>
    </div>
  );
}
