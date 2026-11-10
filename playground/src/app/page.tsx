import { useState } from 'react';

import { Button } from '../components/button';

export default function HomePage() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <main>
      <h1>Style Guide Playground</h1>
      <p>Clicked {count} times</p>
      <Button onClick={handleIncrement}>Increment</Button>
    </main>
  );
}
