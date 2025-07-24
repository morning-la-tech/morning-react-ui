import { Color, Size } from 'morning-react-ui/utils/Enum';
import styles from './tag.module.css';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  label?: string;
  color?: Color;
  size?: Size;
  emoji?: string | null;
};

const Tag = ({
  className,
  label,
  color = Color.gray,
  size = Size.s,
  emoji,
  ...props
}: TagProps) => {
  return (
    <span
      className={`${styles.tag} ${styles[`tag-${color}`]} ${styles[`tag-${size}`]} ${className || ''}`}
      {...props}
    >
      {emoji} {label}
    </span>
  );
};

export default Tag;
