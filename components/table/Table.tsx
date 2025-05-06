import {
  createContext,
  HTMLProps,
  ReactNode,
  useContext,
  useState,
} from 'react';
import classNames from 'classnames';
import styles from './Table.module.css';

type TableContextProps = {
  dropdownFields: Record<string, boolean> | undefined;
  registerDropdownField: (field: string, hasDropdown: boolean) => void;
  isLoading?: boolean;
  skeletonRowNumber?: number;
};

const TableContext = createContext<TableContextProps | undefined>(undefined);

const useTableContext = () => {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTableContext must be used within a <Table>');
  return ctx;
};

type TableProps = HTMLProps<HTMLTableElement> & {
  isLoading?: boolean;
  skeletonRowNumber?: number;
  children: ReactNode;
};

const Table = ({
  className,
  isLoading,
  children,
  skeletonRowNumber,
  ...props
}: TableProps) => {
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
        skeletonRowNumber,
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

export { Table, TableCaption, useTableContext };
