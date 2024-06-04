'use client';
import { useState } from 'react';
import Column from 'morning-react-ui/components/layout/Column';
import Columns from 'morning-react-ui/components/layout/Columns';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { Pagination } from 'morning-react-ui/components/pagination';
import { Size } from 'morning-react-ui/utils/Enum';

interface TableProps {
  page: number;
}

const Table = ({ page }: TableProps) => {
  const rows = 10;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

  const generateTableData = (current_page: number) => {
    const startRow = current_page * rows;
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from(
        { length: columns.length },
        (__, colIndex) => `${startRow + rowIndex}${columns[colIndex]}`,
      ),
    );
  };

  const tableData = generateTableData(page);

  return (
    <table border={1}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Page = () => {
  const [page, setPage] = useState(1);
  const pagination = {
    currentPage: page,
    pageSize: 10,
    total: 100,
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Pagination</h1>
      </Navigation>
      <Container>
        <Columns>
          <Column>
            <Columns>
              <Column>
                <Pagination
                  size={Size.l}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Pagination
                  size={Size.m}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Pagination
                  size={Size.s}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Pagination
                  size={Size.l}
                  hasBorder={true}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Pagination
                  size={Size.m}
                  hasBorder={true}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Pagination
                  size={Size.s}
                  hasBorder={true}
                  pagination={pagination}
                  setCurrentPage={setPage}
                />
              </Column>
            </Columns>
          </Column>
          <Column>
            <div>
              <Table page={page} />
            </div>
          </Column>
        </Columns>
      </Container>
    </>
  );
};

export default Page;
