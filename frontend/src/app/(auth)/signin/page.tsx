import Head from 'next/head';
import LoginForm from 'src/componets/SignIn';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>로그인 폼</title>
      </Head>
      <LoginForm />
    </div>
  );
};

export default Home;
