import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Link href={'/buttons'}>Buttons</Link>
    </div>
  );
}
