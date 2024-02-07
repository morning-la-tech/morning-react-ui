'use client';
import useCounterStore from '@/stores/useCounterStore';

const Counter = () => {
  const { count, increment, reset } = useCounterStore();

  return (
    <div>
      <h2>Compteur: {count}</h2>
      <button onClick={increment}>Incrémenter</button>
      <button onClick={reset}>Réinitialiser</button>
    </div>
  );
};

export default Counter;
