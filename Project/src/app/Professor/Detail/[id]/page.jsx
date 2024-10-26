import AttendanceTable from './../../../../Component/교수/대시보드/디테일/AttendanceTable';
import { studentData, subjectData } from './../../../../temp/temp.data';

export async function generateMetadata({ params: { id } }) {
  return {
    title: `${subjectData[id - 1].title} - ${subjectData[id - 1].grade}학년 ${subjectData[id - 1].class}반`,
  };
}

async function SaveInfo(id, statuses) {
  'use server';
  // API에 Fetch할꺼임
  // console.log('id:', id, 'statuses:', statuses);
  return true;
}

export default async function Page({ params: { id } }) {
  const weekNumber = Math.floor(Math.random() * 15) + 1;
  const data = studentData;
  const handleSaveInfo = async (statuses) => {
    'use server';
    return await SaveInfo(id - 1, statuses);
  };
  return (
    <AttendanceTable SaveInfo={handleSaveInfo} data={data} subjectData={subjectData[id - 1]} weekNumber={weekNumber} />
  );
}
