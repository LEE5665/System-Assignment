import AttendanceTable from '@/components/AttendanceTable';
import styles from '@/styles/professor-detail.module.css';
export async function generateMetadata({ params: { id } }: IdParms) {
  return {
    title: decodeURI(id),
  };
}
export default async function Page({ params: { id } }: IdParms) {
  // fetch 해와
  const _data: ProfDetailParms = {
    class_id: '1',
    class_name: decodeURI(id),
    week: '7',
    students: [
      ['200200161', '김지훈'],
      ['201137760', '조지훈'],
      ['200218539', '김성훈'],
      ['201247963', '김동현'],
      ['200206883', '이서연'],
      ['200172689', '박성호'],
      ['200163882', '오정자'],
      ['201644196', '홍은주'],
      ['201527613', '최서준'],
      ['201024387', '서선영'],
      ['202199620', '김경숙'],
      ['201458311', '이준영'],
      ['201706573', '김수빈'],
      ['201741640', '황상호'],
      ['201966161', '김성훈'],
      ['200937065', '김정숙'],
      ['202037367', '김영진'],
      ['200251831', '이진호'],
      ['201158154', '노재현'],
      ['202347738', '서영일'],
      ['200326093', '김명숙'],
      ['200543251', '이민서'],
      ['201585946', '민춘자'],
      ['200943165', '이현정'],
      ['200605778', '남은경'],
      ['200421331', '김민준'],
      ['201430559', '이서준'],
      ['201923730', '김민지'],
      ['200094397', '이예진'],
      ['201461605', '김은영'],
    ],
  };
  return (
    <div className={styles.container}>
      <AttendanceTable datas={_data} />
    </div>
  );
}
