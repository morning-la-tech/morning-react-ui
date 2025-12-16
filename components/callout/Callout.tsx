import { Color, Size, sizeToNumber } from 'morning-react-ui/utils/Enum';
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
      {icon && (
        <div className={styles.iconContainer}>
          <span
            className={`${styles.icon} ${styles[`mask-${color}`]}`}
            style={{
              maskImage: `url(${icon})`,
              width: sizeToNumber(size),
              height: sizeToNumber(size),
            }}
          />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Callout;
