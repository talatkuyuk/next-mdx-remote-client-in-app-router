"use client";

import { useState } from "react";
import { type ReactNode, createContext, useContext } from "react";

/**
 * Internal context for the transitions.
 */
const TransitionContext = createContext<ReturnType<
  typeof useTransitionInternal
> | null>(null);

/**
 * Reads the transition context.
 */
function useTransitionContext() {
  const transition = useContext(TransitionContext);

  if (transition === null) {
    throw new Error(
      "Make sure to use `TransitionProvider` before using the transition context."
    );
  }

  return transition;
}

/**
 * Custom hook for managing transition state.
 */
function useTransitionInternal() {
  const [loading, setLoading] = useState(false);

  /**
   * Start the transition.
   */
  function start() {
    setLoading(true);
  }

  /**
   * End the transition.
   */
  function end() {
    setLoading(false);
  }

  return { loading, start, end };
}

/**
 * Provides the transition value to the child components.
 *
 * @param children - The child components to render.
 * @returns The rendered TransitionContext.Provider component.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const transition = useTransitionInternal();

  return (
    <TransitionContext.Provider value={transition}>
      {children}
    </TransitionContext.Provider>
  );
}

/**
 * A custom hook that returns transition state.
 */
export function useTransitionState(): {
  loading: boolean;
  start: () => void;
  end: () => void;
} {
  const transition = useTransitionContext();

  const start = () => {
    transition.start();
  };

  const end = () => {
    transition.end();
  };

  return {
    loading: transition.loading,
    start,
    end,
  };
}
