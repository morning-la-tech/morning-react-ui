import {
  createContext,
  HTMLProps,
  ReactNode,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './table.module.css';

type TableContextProps = {
  dropdownFields: Record<string, boolean> | undefined;
  registerDropdownField: (field: string, hasDropdown: boolean) => void;
  isLoading?: boolean;
  skeletonRows?: number;
};

const TableContext = createContext<TableContextProps | undefined>(undefined);

const useTableContext = () => {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTableContext must be used within a <Table>');
  return ctx;
};

type AdvancedTableProps = HTMLProps<HTMLTableElement> & {
  isLoading?: boolean;
  children: ReactNode;
  skeletonRows?: number;
};

const AdvancedTable = ({
  className,
  isLoading,
  children,
  skeletonRows,
  ...props
}: AdvancedTableProps) => {
  const [dropdownFields, setDropdownFields] =
    useState<Record<string, boolean>>();
  const registerDropdownField = (field: string, hasDropdown: boolean) => {
    setDropdownFields((prev) => {
      const next = { ...(prev || {}) };
      next[field] = hasDropdown;
      return next;
    });
  };

  return (
    <TableContext.Provider
      value={{
        dropdownFields,
        registerDropdownField,
        isLoading,
        skeletonRows,
      }}
    >
      <table {...props} className={classNames(styles.table, className)}>
        {children}
      </table>
    </TableContext.Provider>
  );
};

const TableCaption = ({
  className,
  ...props
}: HTMLProps<HTMLTableCaptionElement>) => {
  return (
    <caption {...props} className={classNames(styles.caption, className)} />
  );
};

export { AdvancedTable, TableCaption, useTableContext };
