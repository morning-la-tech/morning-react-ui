import { createContext, HTMLProps, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import styles from './tableRow.module.css';

type TableRowContextProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  rowValues: Record<string, unknown>;
  maxLength: number;
};

type TableRowProps = HTMLProps<HTMLTableRowElement> & {
  rowValues?: Record<string, unknown>;
};

/**
 * TableRow component
 */
const TableRow = ({ rowValues = {}, className, ...props }: TableRowProps) => {
  const [collapsed, setCollapsed] = useState(true);

  // Check if rowValues contain any arrays -> set maxLength to the longest array
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
