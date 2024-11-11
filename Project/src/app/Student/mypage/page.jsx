import getData from '../../../action/getData';
import MyPageComponent from './../../../Component/공용/마이페이지/mypage';
export default async function MyPage() {
  const data = await getData();
  return <MyPageComponent data={data} />;
}
