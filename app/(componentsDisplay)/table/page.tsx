'use client';
import { ReactNode, useEffect, useState } from 'react';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import {
  AdvancedTable,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'morning-react-ui/components/table/advanced';
import { getNextOrders } from 'morning-react-ui/components/table/advanced/utils';
import { SortOrder } from 'morning-react-ui/components/table/enum';
import { SimpleTable } from 'morning-react-ui/components/table/simple';
import Tag from 'morning-react-ui/components/tag/Tag';
import { Color } from 'morning-react-ui/utils/Enum';
import styles from './page.module.css';

export default function Page() {
  const [orders, setOrders] = useState<Record<string, SortOrder | null>>({
    paymentStatus: null,
    paymentMethod: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  type Invoice = {
    invoice: string;
    place: ReactNode;
    paymentStatus: ReactNode | ReactNode[];
    totalAmount: string | string[];
    paymentMethod: string | string[];
  };

  type SimpleInvoice = {
    invoice: string;
    place: ReactNode;
    paymentStatus: ReactNode;
    totalAmount: string;
    paymentMethod: string;
  };

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setInvoices([
        {
          invoice: 'INV001',
          place: <Tag label='🍟 Laffitte' color={Color.gray} />,
          paymentStatus: <Tag label='Paid' color={Color.green} />,
          totalAmount: '$250.00',
          paymentMethod: 'Credit Card',
        },
        {
          invoice: 'INV002',
          place: <Tag label='🍟 Laffitte' color={Color.gray} />,
          paymentStatus: <Tag label='Pending' color={Color.orange} />,
          totalAmount: '$150.00',
          paymentMethod: 'PayPal',
        },
        {
          invoice: 'INV003',
          place: <Tag label='⚜️ Saint-Ho' color={Color.gray} />,
          paymentStatus: <Tag label='Paid' color={Color.green} />,
          totalAmount: '$350.00',
          paymentMethod: 'Bank Transfer',
        },
        {
          invoice: 'INV004',
          place: <Tag label='⚜️ Saint-Ho' color={Color.gray} />,
          paymentStatus: <Tag label='Unpaid' color={Color.red} />,
          totalAmount: '$450.00',
          paymentMethod: 'Credit Card',
        },
        {
          invoice: 'INV005',
          place: (
            <>
              <Tag
                style={{ marginRight: '4px' }}
                label='🍟 Laffitte'
                color={Color.gray}
              />
              <Tag label='⛲️ Trévise' color={Color.gray} />
            </>
          ),
          paymentStatus: <Tag label='Unpaid' color={Color.red} />,
          totalAmount: '$550.00',
          paymentMethod: 'PayPal',
        },
        {
          invoice: 'INV006',
          place: <Tag label='⚜️ Saint-Ho' color={Color.gray} />,
          paymentStatus: [
            <Tag key={1} label='Paid' color={Color.green} />,
            <Tag key={2} label='Unpaid' color={Color.red} />,
          ],
          totalAmount: ['$300.00', '$400.00'],
          paymentMethod: ['Credit Card', 'PayPal'],
        },
        {
          invoice: 'INV007',
          place: <Tag label='⛲️ Trévise' color={Color.gray} />,
          paymentStatus: [
            <Tag key={1} label='Paid' color={Color.green} />,
            <Tag key={2} label='Unpaid' color={Color.red} />,
            <Tag key={3} label='Unpaid' color={Color.red} />,
            <Tag key={4} label='Paid' color={Color.green} />,
            <Tag key={5} label='Paid' color={Color.green} />,
            <Tag key={6} label='Paid' color={Color.green} />,
            <Tag key={7} label='Unpaid' color={Color.red} />,
            <Tag key={8} label='Unpaid' color={Color.red} />,
            <Tag key={9} label='Paid' color={Color.green} />,
            <Tag key={10} label='Unpaid' color={Color.red} />,
            <Tag key={11} label='Paid' color={Color.green} />,
          ],
          totalAmount: [
            '$300.00',
            '$500.00',
            '$600.00',
            '$700.00',
            '$800.00',
            '$400.00',
            '$300.00',
            '$400.00',
            '$500.00',
            '$300.00',
            '$400.00',
          ],
          paymentMethod: [
            'Credit Card',
            'PayPal',
            'Bank Transfer',
            'Credit Card',
            'PayPal',
            'Bank Transfer',
            'Credit Card',
            'PayPal',
            'Bank Transfer',
            'Credit Card',
            'PayPal',
          ],
        },
      ]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const simpleInvoices: SimpleInvoice[] = [
    {
      invoice: 'INV001',
      place: <Tag label='🍟 Laffitte' color={Color.gray} />,
      paymentStatus: <Tag label='Paid' color={Color.green} />,
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      place: <Tag label='⚜️ Saint-Ho' color={Color.gray} />,
      paymentStatus: <Tag label='Unpaid' color={Color.red} />,
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      place: <Tag label='⛲️ Trévise' color={Color.gray} />,
      paymentStatus: <Tag label='Pending' color={Color.orange} />,
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
  ];

  const simpleInvoiceColumns = [
    { key: 'invoice', header: 'Invoice' },
    { key: 'place', header: 'Place' },
    { key: 'paymentStatus', header: 'Status' },
    { key: 'paymentMethod', header: 'Method' },
    { key: 'totalAmount', header: 'Amount' },
  ];

  return (
    <>
      <Navigation>
        <h1 className={styles.title}>Table</h1>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <AdvancedTable isLoading={isLoading} skeletonRows={7}>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: '16px' }} />
              <TableHead field='invoice' style={{ paddingLeft: '20px' }}>
                Invoice
              </TableHead>
              <TableHead field='place'>Place</TableHead>
              <TableHead
                field='paymentStatus'
                order={orders.paymentStatus}
                sortCallback={() =>
                  setOrders((prev) => getNextOrders(prev, 'paymentStatus'))
                }
              >
                Status
              </TableHead>
              <TableHead
                field='paymentMethod'
                order={orders.paymentMethod}
                sortCallback={() =>
                  setOrders((prev) => getNextOrders(prev, 'paymentMethod'))
                }
              >
                Method
              </TableHead>
              <TableHead>Amount</TableHead>
              <TableHead style={{ width: '16px' }} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isLoading ? Array.of(null) : invoices).map((invoice, index) => (
              <TableRow
                key={invoice?.invoice ?? `skeleton-${index}`}
                rowValues={invoice ?? {}}
              >
                <TableCell />
                <TableCell
                  field='invoice'
                  showRowExpandChevron
                  skeletonClassName={styles.skeleton}
                >
                  {invoice?.invoice}
                </TableCell>
                <TableCell field='place' skeletonClassName={styles.skeleton}>
                  {invoice?.place}
                </TableCell>
                <TableCell
                  showRowExpandChevron
                  field='paymentStatus'
                  skeletonClassName={styles.skeleton}
                >
                  {invoice?.paymentStatus}
                </TableCell>
                <TableCell
                  field='paymentMethod'
                  skeletonClassName={styles.skeleton}
                >
                  {invoice?.paymentMethod}
                </TableCell>
                <TableCell
                  field='totalAmount'
                  skeletonClassName={styles.skeleton}
                >
                  {invoice?.totalAmount}
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>$2,500.00</TableCell>
              <TableCell />
            </TableRow>
          </TableFooter>
        </AdvancedTable>
        <SimpleTable
          data={simpleInvoices}
          columns={simpleInvoiceColumns}
          onSortChange={(field, order) => {
            console.log(`Sort by ${field} (${order})`);
          }}
          isLoading={isLoading}
          skeletonRows={5}
        />
        <SimpleTable
          data={[]}
          columns={simpleInvoiceColumns}
          onSortChange={(field, order) => {
            console.log(`Sort by ${field} (${order})`);
          }}
          isLoading={isLoading}
          skeletonRows={5}
        />
      </div>
    </>
  );
}
