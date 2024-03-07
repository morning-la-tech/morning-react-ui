import classNames from 'classnames';
import { Size } from '@/util/Enum';
import styles from './checkbox.module.css';

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  size?: Size;
  className?: string;
}

const Checkbox = ({ label, value, onChange, size = Size.m, className }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  const checkboxClass = classNames(styles.checkbox, styles[size], className);

  return (
    <label className={checkboxClass}>
      <input type='checkbox' checked={value} onChange={handleChange} />
      {label}
    </label>
  );
};

export default Checkbox;
