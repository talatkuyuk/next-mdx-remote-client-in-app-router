"use client";

import { MDXProvider } from "next-mdx-remote-client";

type Props = {
  children?: React.ReactNode;
};

export default function OuterMDXProvider({ children }: Props) {
  return (
    <MDXProvider
      components={{
        ComponentFromOuterProvider: () => {
          return (
            <div className="outer-content">
              <p style={{ color: "var(--secondary)" }}>
                I am a component coming from outer MDXProvider
              </p>
            </div>
          );
        },
      }}
    >
      {children}
    </MDXProvider>
  );
}
