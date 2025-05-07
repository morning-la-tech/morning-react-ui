import * as React from 'react';
import { Color, Size } from 'morning-react-ui/utils/Enum';
import styles from './tag.module.css';

type TagProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  label?: string;
  color: Color;
  size?: Size;
};

const Tag = ({
  className,
  label,
  color,
  size = Size.s,
  ...props
}: TagProps) => {
  return (
    <span
      className={`${styles.tag} ${styles[`tag-${color}`]} ${styles[`tag-${size}`]} ${className || ''}`}
      {...props}
    >
      {label}
    </span>
  );
};

export default Tag;
