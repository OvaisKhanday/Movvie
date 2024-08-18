import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>
          Count: <span data-testid='counter'>{count}</span>
        </h1>
        <button onClick={() => setCount((prev) => prev + 1)} data-testid='counter-increment'>
          Increment
        </button>
      </div>
    </>
  );
}

export default App;
