'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import {
  SkeletonCell,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'morning-react-ui/components/table';
import Tag from 'morning-react-ui/components/tag/Tag';
import { Color } from 'morning-react-ui/utils/Enum';
import styles from './page.module.css';

export default function Page() {
  const [paymentMethodOrder, setPaymentMethodOrder] = useState<'asc' | 'desc'>(
    'asc',
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  type Invoice = {
    invoice: string;
    place: React.ReactNode;
    paymentStatus: React.ReactNode | React.ReactNode[];
    totalAmount: string | string[];
    paymentMethod: string | string[];
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
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <Navigation>
        <h1 className={styles.title}>Table</h1>
      </Navigation>
      <Table isLoading={isLoading}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: '16px' }} />
            <TableHead field='invoice' style={{ paddingLeft: '20px' }}>
              Invoice
            </TableHead>
            <TableHead field='place'>Place</TableHead>
            <TableHead field='paymentStatus' style={{ paddingLeft: '20px' }}>
              Status
            </TableHead>
            <TableHead
              field='paymentMethod'
              order={paymentMethodOrder}
              sortCallback={(order: 'asc' | 'desc') => {
                setInvoices((prevInvoices) => {
                  const sortedInvoices = [...prevInvoices];
                  sortedInvoices.sort((a, b) => {
                    if (order === 'asc') {
                      return a.paymentMethod[0].localeCompare(
                        b.paymentMethod[0],
                      );
                    } else {
                      return b.paymentMethod[0].localeCompare(
                        a.paymentMethod[0],
                      );
                    }
                  });
                  return sortedInvoices;
                });
                setPaymentMethodOrder(order);
              }}
            >
              Method
            </TableHead>
            <TableHead>Amount</TableHead>
            <TableHead style={{ width: '16px' }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 7 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  <SkeletonCell />
                  <SkeletonCell
                    field='invoice'
                    className={styles.paddingChevron}
                    shimmerClassName={classNames(styles.skeleton)}
                  />
                  <SkeletonCell
                    field='place'
                    shimmerClassName={styles.skeleton}
                  />
                  <SkeletonCell
                    field='paymentStatus'
                    style={{ paddingLeft: '20px' }}
                    shimmerClassName={styles.skeleton}
                  />
                  <SkeletonCell
                    field='paymentMethod'
                    shimmerClassName={styles.skeleton}
                  />
                  <SkeletonCell
                    field='totalAmount'
                    shimmerClassName={styles.skeleton}
                  />
                  <SkeletonCell />
                </TableRow>
              ))
            : invoices.map((invoice) => (
                <TableRow key={invoice.invoice} rowValues={invoice}>
                  <TableCell />
                  <TableCell field='invoice' showRowExpandChevron>
                    {invoice.invoice}
                  </TableCell>
                  <TableCell field='place'>{invoice.place}</TableCell>
                  <TableCell showRowExpandChevron field='paymentStatus'>
                    {invoice.paymentStatus}
                  </TableCell>
                  <TableCell field='paymentMethod'>
                    {invoice.paymentMethod}
                  </TableCell>
                  <TableCell field='totalAmount'>
                    {invoice.totalAmount}
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
      </Table>
    </>
  );
}
