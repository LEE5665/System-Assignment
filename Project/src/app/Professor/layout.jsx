import ProfessorNavBar from './../../Component/교수/내비게이션/NavBar';

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
