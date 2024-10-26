import AttendanceTable from './../../../../Component/교수/대시보드/디테일/AttendanceTable';
export default async function Page({ params: { id } }) {
  const data = [
    { id: '1', name: '차민준', number: '202144063' },
    { id: '2', name: '이정재', number: '202144084' },
    { id: '3', name: '최건', number: '202144092' },
    { id: '4', name: '허호정', number: '202144075' },
    { id: '5', name: '김재홍', number: '202144059' },
  ];
  return <AttendanceTable data={data} />;
}
