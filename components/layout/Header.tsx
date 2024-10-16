'use client';
import { ReactNode, CSSProperties } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useIsMobile from 'morning-react-ui/components/hooks/useIsMobile';
import styles from './header.module.css';

type HeaderProps = {
  title?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

const Header = ({ title, children, style }: HeaderProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <header className={styles.bar} style={style}>
      <div className={styles.container}>
        <div className={styles.imageAndTitle}>
          <Image
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}logos/logo_morning_black.png`}
            alt='logo'
            width={isMobile ? 68 : 81}
            height={isMobile ? 16 : 19}
            className={styles.logo}
            onClick={() => router.push('/')}
          />
          <p className={styles.title}>{title}</p>
        </div>
        <div className={styles.children}>{children}</div>
      </div>
    </header>
  );
};

export default Header;
