import { getTokenId } from '../../action/token';
import { subjectData } from '../../temp/temp.data';
import DashBoard from './../../Component/교수/대시보드/DashBoard';

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
  // const data = await getData();
  return <DashBoard data={subjectData} />;
}
