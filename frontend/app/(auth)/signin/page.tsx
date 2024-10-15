import styles from '@/styles/signin.module.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function signinapi(formData: FormData) {
  'use server';
  // api로 post보내서 대충 쿠키에 알잘딱
  if (formData.get('id') === 'test' && formData.get('password') === 'gkrtod') {
    //학생
    cookies().set('test', JSON.stringify({ name: '차민준', isPrf: false }), { httpOnly: true });
    redirect('/student/dashboard');
  } else if (formData.get('id') === 'test' && formData.get('password') === 'rytn') {
    //교수
    cookies().set('test', JSON.stringify({ name: '차민준', isPrf: true }), { httpOnly: true });
    redirect('/professor/dashboard');
  } else {
    redirect('/signin');
  }
}

export default function SignInPage() {
  return (
    <div className={styles.loginDiv}>
      <form action={signinapi}>
        <label htmlFor="id">ID</label>
        <input type="text" name="id" id="id" placeholder="학번이나 교번을 입력하세요." required autoComplete="fasle" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button>로그인</button>
      </form>
    </div>
  );
}
