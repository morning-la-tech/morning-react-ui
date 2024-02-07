import { Titi, Toto } from '@/components';
import Counter from '@/components/Counter';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Toto />
      <Titi />
      <Counter />
    </div>
  );
}
