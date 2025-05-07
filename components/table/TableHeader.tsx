import { HTMLProps } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useTableContext } from './Table';
import styles from './TableHeader.module.css';

const TableHeader = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return <thead {...props} className={classNames(styles.thead, className)} />;
};

type TableHeadProps = HTMLProps<HTMLTableCellElement> & {
  sortCallback?: (order: 'asc' | 'desc') => void;
  order?: 'asc' | 'desc';
  field?: string;
};

const TableHead = ({
  field,
  className,
  children,
  order = 'asc',
  sortCallback,
  ...props
}: TableHeadProps) => {
  const { dropdownFields, isLoading } = useTableContext();
  const hasDropdown = dropdownFields?.[field ?? ''] ?? false;

  const paddingClass = hasDropdown ? styles['pl-5-pr-1-5'] : styles['px-1-5'];

  return (
    <th
      {...props}
      className={classNames(
        styles.th,
        paddingClass,
        !isLoading && sortCallback && styles.clickable,
        className,
      )}
      onClick={() =>
        !isLoading &&
        sortCallback &&
        sortCallback(order === 'asc' ? 'desc' : 'asc')
      }
    >
      <div className={styles.labelWrapper}>
        {children}
        {sortCallback && (
          <Image
            className={classNames(styles.icon, {
              [styles.rotated]: order === 'desc',
            })}
            src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/pilote-chevron-down.svg`}
            alt='sort'
            width={15}
            height={15}
          />
        )}
      </div>
    </th>
  );
};

export { TableHeader, TableHead };
