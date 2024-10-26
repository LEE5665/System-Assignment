import NavBar from './../../Component/공용/내비게이션/NavBar';
export const metadata = {
  title: '교수',
};

export default function Layout({ children }) {
  return (
    <div className="back">
      <NavBar type={'Professor'} />
      <div className="content">{children}</div>
    </div>
  );
}
