import Image from 'next/image';
import { Color, Size } from 'morning-react-ui/utils/Enum';
import styles from './callout.module.css';

type CalloutProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  children?: React.ReactNode;
  color?: Color;
  size?: Size;
  icon?: string;
};

const Callout = ({
  className,
  children,
  color = Color.blue,
  size = Size.m,
  icon,
  ...props
}: CalloutProps) => {
  return (
    <div
      className={`${styles.callout} ${styles[`callout-${color}`]} ${styles[`callout-${size}`]} ${className || ''}`}
      {...props}
    >
      <div className={styles.iconContainer}>
        {icon && (
          <Image
            className={`${styles.icon} ${styles[`filter-${color}`]}`}
            src={icon}
            alt=''
            width={20}
            height={20}
          />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Callout;
