import DashBoard from '../../Component/학생/대시보드/DashBoard';
import { subjectData } from '../../temp/temp.data';

export default function Page() {
  return <DashBoard data={subjectData} />;
}
