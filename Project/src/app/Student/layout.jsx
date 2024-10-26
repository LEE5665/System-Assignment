import StudentNavBar from '../../Component/학생/내비게이션바/NavBar';

export const metadata = {
  title: '학생',
};

export default function Layout({ children }) {
  return (
    <div className="back">
      <StudentNavBar />
      <div className="content">{children}</div>
    </div>
  );
}
