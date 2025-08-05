import Image from 'next/image';
import styles from './avatar.module.css';

type AvatarProps = {
  imageUrl: string;
  size?: number;
};

const Avatar = ({ imageUrl, size = 40 }: AvatarProps) => {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={styles.wrapper}
    >
      <Image
        src={imageUrl}
        alt='Avatar'
        className={styles.image}
        fill
        sizes={`${size}px`}
      />
    </div>
  );
};

export default Avatar;
