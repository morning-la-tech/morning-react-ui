import { createContext, HTMLProps, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.css';

interface TableRowContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  rowValues: Record<string, unknown>;
  maxLength: number;
}

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {
  rowValues?: Record<string, unknown>;
}

/**
 * TableRow component
 */
const TableRow = ({ rowValues = {}, className, ...props }: TableRowProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const maxLength = useMemo(() => {
    const lengths = Object.values(rowValues).map((v) =>
      Array.isArray(v) ? v.length : 1,
    );
    return Math.max(...lengths, 1);
  }, [rowValues]);

  return (
    <TableRowContext.Provider
      value={{ collapsed, setCollapsed, rowValues, maxLength }}
    >
      <tr {...props} className={classNames(styles.tableRow, className)}>
        {props.children}
      </tr>
    </TableRowContext.Provider>
  );
};

const TableRowContext = createContext<TableRowContextProps | undefined>(
  undefined,
);

export const useTableRowContext = () => {
  const context = useContext(TableRowContext);
  if (!context) {
    throw new Error('useTableRowContext must be used within a TableRow');
  }
  return context;
};

export { TableRow };
