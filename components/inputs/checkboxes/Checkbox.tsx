import classNames from 'classnames';
import { Size } from '@/utils/Enum';
import styles from './checkbox.module.css';

type CheckboxProps = {
  onChange: (value: boolean) => void;
  size?: Size;
  label: string;
  value: boolean;
};

const Checkbox = ({ label, value, onChange, size = Size.m }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  const checkboxClass = classNames(styles.checkbox, styles[size]);

  return (
    <label className={checkboxClass}>
      <input type='checkbox' checked={value} onChange={handleChange} />
      {label}
    </label>
  );
};

export default Checkbox;
