import NavBar from '../../Component/공용/내비게이션/NavBar';

export const metadata = {
  title: '학생',
};

export default function Layout({ children }) {
  return (
    <div className='back'>
      <NavBar type={'Student'} />

      <div className='content'>{children}</div>
    </div>
  );
}
