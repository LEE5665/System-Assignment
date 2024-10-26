import ProfessorNavBar from '@/Component/Professor/NavBar/NavBar';

export const metadata = {
  title: '교수',
};

export default function Layout({ children }) {
  return (
    <div className="back">
      <ProfessorNavBar />
      <div className="content">{children}</div>
    </div>
  );
}
