import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>🛍️ Multivendor Platform</h1>
      <p className="subtitle">React + Vite + TypeScript</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Counter: {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Welcome to the multivendor platform. Get started by editing the App component.
      </p>
    </>
  )
}

export default App
