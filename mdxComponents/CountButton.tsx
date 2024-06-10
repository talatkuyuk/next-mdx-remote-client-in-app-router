"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="counter-button"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Count: {count}
    </button>
  );
}
