'use client';
import { useState } from 'react';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from 'morning-react-ui/components/table/Table';
import Tag from 'morning-react-ui/components/tag/Tag';
import { Color } from 'morning-react-ui/utils/Enum';

export default function Page() {
  const [paymentMethodOrder, setPaymentMethodOrder] = useState<'asc' | 'desc'>(
    'asc',
  );
  const [invoices, setInvoices] = useState([
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
      paymentStatus: <Tag label='Unpaid' color={Color.red} />,
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      place: <Tag label='⛲️ Trévise' color={Color.gray} />,
      paymentStatus: <Tag label='Paid' color={Color.green} />,
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ]);
  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}>Table</h1>
      </Navigation>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                order={paymentMethodOrder}
                sortCallback={(order: 'asc' | 'desc') => {
                  setInvoices((prevInvoices) => {
                    const sortedInvoices = [...prevInvoices];
                    sortedInvoices.sort((a, b) => {
                      if (order === 'asc') {
                        return a.paymentMethod.localeCompare(b.paymentMethod);
                      } else {
                        return b.paymentMethod.localeCompare(a.paymentMethod);
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.place}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
}
