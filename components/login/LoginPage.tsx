import Image from 'next/image';
import classNames from 'classnames';
import { space_grotesk } from 'morning-react-ui/app/fonts';
import GoogleLoginButton from '../buttons/GoogleLoginButton';
import styles from './LoginPage.module.css';

type Props = {
  onClick: () => void;
  title: string;
  body: string;
  imageBackgroundSrc?: string;
};

const LoginPage = ({
  onClick,
  title,
  body,
  imageBackgroundSrc = `${process.env.NEXT_PUBLIC_MORNING_CDN_URL}images/login_background.jpeg`,
}: Props) => (
  <div className={styles.loginContainer}>
    <div className={styles.banner}>
      <div className={styles.backgroundImageContainer}>
        <Image
          src={`${imageBackgroundSrc}`}
          alt='Fond de connexion'
          fill
          priority
          sizes='100vh'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.logoContainer}>
        <Image
          src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}logos/logo_morning_white.png`}
          alt='logo'
          width={160}
          height={39}
        />
      </div>
    </div>

    <div className={styles.loginForm}>
      <div className={styles.loginBody}>
        <div className={styles.title}>{title}</div>
        <div className={classNames(styles.body, space_grotesk.variable)}>
          {body}
        </div>
        <GoogleLoginButton onClick={onClick} />
      </div>
    </div>
  </div>
);

export default LoginPage;
