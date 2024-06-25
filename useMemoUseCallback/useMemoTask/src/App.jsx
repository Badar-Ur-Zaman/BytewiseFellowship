import { useState, useMemo } from 'react'
import {initialItems} from './utils'

function App() {
  const [count, setCount] = useState(0)
  const [items] = useState(initialItems)

  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [count, items],
  );

  return (
    <>
      <div className="card">
        <h1>selected Item: {selectedItem?.id}</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
