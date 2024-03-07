import Image from 'next/image';
import styles from './LoginPage.module.css';
import GoogleLoginButton from '../buttons/GoogleLoginButton';

type Props = {
  onClick: () => void;
  title: string;
  body: string;
};

const LoginPage = ({ onClick, title, body }: Props) => (
  <div className={styles.loginContainer}>
    <div className={styles.banner}>
      <div className={styles.backgroundImageContainer}>
        <Image
          src='https://cdn.morning.fr/images/login_background.jpeg'
          alt='Fond de connexion'
          fill
          priority
          sizes='100vh'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.logoContainer}>
        <Image
          src='https://cdn.morning.fr/logos/logo_morning_white.png'
          alt='logo'
          width={160}
          height={39}
        />
      </div>
    </div>
    <div className={styles.loginForm}>
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
      <GoogleLoginButton onClick={onClick} />
    </div>
  </div>
);

export default LoginPage;
