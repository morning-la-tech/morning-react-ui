import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={'/buttons'}>Buttons</Link>
      <Link href={'/inputs'}>Inputs</Link>
      <Link href={'/checkbox'}>Checkbox</Link>
      <Link href={'/utils'}>Utils</Link>
    </div>
  );
}
