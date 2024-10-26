import AttendanceTable from '@/Component/Professor/Dashboard/Detail/AttendanceTable';

export default async function Page({ params: { id } }) {
  const data = [
    { id: '1', name: '차민준', number: '202144063' },
    { id: '2', name: '이정재', number: '202144084' },
    { id: '3', name: '최건', number: '202144092' },
    { id: '4', name: '허호정', number: '202144075' },
    { id: '5', name: '김재홍', number: '202144059' },
  ];
  return <AttendanceTable data={data} subjectName="소프트웨어 공학" weekNumber={3} />;
}
