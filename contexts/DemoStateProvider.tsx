"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
};

const INITIAL_STATE = {
  counter: 0,
  value: "",
};

const DemoStateContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

export const useDemoContext = () => {
  return useContext(DemoStateContext);
};

// const DemoStateConsumer = ({ children }: Props): JSX.Element => {
//   return <DemoStateContext.Consumer>{children}</DemoStateContext.Consumer>;
// };

const DemoStateProvider = ({ children }: Props): JSX.Element => {
  const [counter, setCounter] = useState(10);
  const [value, setValue] = useState("demo started");

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the counter and value
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      setValue("demo ended");
      clearInterval(interval);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [counter]);

  // Context value
  const contextValue = {
    counter,
    value,
  };

  return (
    <DemoStateContext.Provider value={contextValue}>
      {children}
    </DemoStateContext.Provider>
  );
};

export default DemoStateProvider;
