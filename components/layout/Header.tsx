import { PropsWithChildren } from 'react';
import Image from 'next/image';
import styles from './header.module.css';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className={styles.bar}>
      <div className={styles.container}>
        <Image
          src={`https://cdn.morning.fr/logos/logo_morning_black.png`}
          alt='logo'
          width={90}
          height={19}
          style={{ marginTop: '3px', marginRight: '5px' }}
        />
        {children}
      </div>
    </header>
  );
};

export default Header;
