import StudentNavBar from '@/Component/Student/NavBar/NavBar';

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
