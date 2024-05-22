import Image from 'next/image';
import styles from './googleLoginButton.module.css';

type Props = {
  onClick: () => void;
};

const GoogleLoginButton = ({ onClick }: Props) => (
  <button className={styles.googleLoginButton} onClick={onClick}>
    <Image
      src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}logos/logo_google.png`}
      alt='Google logo'
      width={24}
      height={24}
    />
    <span>{'Se connecter avec Google'}</span>
  </button>
);

export default GoogleLoginButton;
