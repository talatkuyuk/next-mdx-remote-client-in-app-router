"use client";

import { useDemoContext } from "@/contexts/DemoStateProvider";

export default function ContextConsumer() {
  const { counter, value } = useDemoContext();

  return (
    <p className="demo-context">
      Context Consumer:{" "}
      <span className="demo-context-value">&quot;{value}&quot;</span>{" "}
      <span className="demo-context-counter">
        <strong>{counter > 0 ? counter : ""}</strong>
      </span>
    </p>
  );
}
