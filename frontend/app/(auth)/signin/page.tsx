import styles from '@/styles/signin.module.css';

export default function SignInPage() {
  return (
    <div className={styles.loginDiv}>
      <form>
        <label htmlFor="id">ID</label>
        <input type="text" name="id" id="id" placeholder="학번이나 교번을 입력하세요." required />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button>로그인</button>
      </form>
    </div>
  );
}
