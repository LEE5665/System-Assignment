import { getTokenId } from '@/src/action/token';
import DashBoard from '@/src/Component/교수/대시보드/DashBoard';
async function getData() {
  'use server';
  const response = await fetch(process.env.GET_MAIN_PAGE_DATA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: getTokenId(),
    }),
  });
  if (response.ok) {
    return response.json();
  }
}
export default async function Page() {
  // id : db의 id
  // title : 과목명
  // grade : 학년
  // class : 반
  const data = [
    { id: '1', title: '시스템분석설계', grade: '1', class: 'A' },
    { id: '2', title: '시스템분석설계', grade: '1', class: 'B' },
    { id: '3', title: '시스템분석설계', grade: '1', class: 'C' },
    { id: '4', title: '시스템분석설계', grade: '2', class: 'A' },
    { id: '5', title: '시스템분석설계', grade: '2', class: 'B' },
    { id: '6', title: '시스템분석설계', grade: '2', class: 'C' },
    { id: '7', title: 'JSP', grade: '1', class: 'A' },
    { id: '8', title: 'JSP', grade: '1', class: 'B' },
    { id: '9', title: 'JSP', grade: '1', class: 'C' },
    { id: '10', title: 'JAVA프로그래밍', grade: '2', class: 'A' },
    { id: '11', title: 'JAVA프로그래밍', grade: '2', class: 'B' },
    { id: '12', title: 'JAVA프로그래밍', grade: '2', class: 'C' },
    { id: '13', title: '운영체제', grade: '3', class: 'A' },
    { id: '14', title: '운영체제', grade: '3', class: 'B' },
    { id: '15', title: '운영체제', grade: '3', class: 'C' },
    { id: '16', title: '정보보안', grade: '3', class: 'A' },
    { id: '17', title: '정보보안', grade: '3', class: 'B' },
    { id: '18', title: '정보보안', grade: '3', class: 'C' },
  ];
  //await getData();
  return <DashBoard data={data} />;
}
