import { HTMLProps, useState } from 'react';
import * as React from 'react';
import Image from 'next/image';
import styles from './table.module.css';

const Table = ({ className, ...props }: HTMLProps<HTMLTableElement>) => {
  return (
    <table
      {...props}
      className={`font-size-m ${styles.table} ${className || ''}`}
    />
  );
};

const TableHeader = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return (
    <thead {...props} className={`${styles.tableHeader} ${className || ''}`} />
  );
};

const TableBody = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return (
    <tbody {...props} className={`${styles.tableBody} ${className || ''}`} />
  );
};

const TableFooter = ({
  className,
  ...props
}: HTMLProps<HTMLTableSectionElement>) => {
  return (
    <tfoot {...props} className={`${styles.tableFooter} ${className || ''}`} />
  );
};

const TableRow = ({ className, ...props }: HTMLProps<HTMLTableRowElement>) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <tr
      {...props}
      className={`${styles.tableRow} ${className || ''} ${
        collapsed ? styles.collapsed : styles.expended
      }`}
    >
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child) && child.type === TableCell) {
          return React.cloneElement(
            child as React.ReactElement<TableCellProps>,
            {
              key: index,
              collapsed,
              setCollapsed: (child.props as TableCellProps)?.showChevron
                ? setCollapsed
                : undefined,
            },
          );
        }
        return child;
      })}
    </tr>
  );
};

interface TableHeadProps extends HTMLProps<HTMLTableCellElement> {
  sortCallback?: (order: 'asc' | 'desc') => void;
  order?: 'asc' | 'desc';
}

const TableHead = ({
  className,
  children,
  order = 'asc',
  sortCallback,
  ...props
}: TableHeadProps) => {
  return (
    <th
      {...props}
      className={`${styles.tableHead} ${className || ''} ${sortCallback ? styles.sortable : ''}`}
      onClick={() =>
        sortCallback && sortCallback(order === 'asc' ? 'desc' : 'asc')
      }
    >
      {children}
      {sortCallback && (
        <Image
          className={`${order === 'desc' ? styles.rotate180 : ''}`}
          src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/pilote-chevron-down.svg`}
          alt='url'
          width={15}
          height={15}
        />
      )}
    </th>
  );
};

interface TableCellProps extends HTMLProps<HTMLTableCellElement> {
  setCollapsed?: (collapsed: boolean) => void;
  collapsed?: boolean;
  showChevron?: boolean;
}

const TableCell = ({
  className,
  collapsed,
  setCollapsed,
  showChevron,
  ...props
}: TableCellProps) => {
  if (Array.isArray(props.children)) {
    return (
      <td {...props} className={`${styles.tableCell} ${className || ''}`}>
        <div className={`${styles.tableCellArrayWrapper}`}>
          {showChevron && setCollapsed && (
            <button
              className={styles.tableCellButton}
              onClick={() => {
                if (setCollapsed) {
                  setCollapsed(!collapsed);
                }
              }}
            >
              <Image
                className={`${collapsed ? styles.rotate180 : ''}`}
                src={`${process.env.NEXT_PUBLIC_MORNING_CDN_URL}icons/pilote-chevron-down.svg`}
                alt='url'
                width={15}
                height={15}
              />
            </button>
          )}
          <div
            className={`${styles.tableCellArray}`}
            style={{
              maxHeight: `${collapsed ? 24 : props.children.length * 26}px`,
            }}
          >
            {props.children.map((child, index) => (
              <div key={index} className={styles.tableCellArrayItem}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </td>
    );
  }
  return <td {...props} className={`${styles.tableCell} ${className || ''}`} />;
};

const TableCaption = ({
  className,
  ...props
}: HTMLProps<HTMLTableCaptionElement>) => {
  return (
    <caption
      {...props}
      className={`${styles.tableCaption} ${className || ''}`}
    />
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
