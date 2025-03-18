"use client";

import React, { type ElementRef, useRef, useState } from "react";

import IconContentCopy from "@/components/icons/IconContentCopy";
import IconDone from "@/components/icons/IconDone";

const Pre = (props: React.ComponentPropsWithoutRef<"pre">) => {
  const preRef = useRef<ElementRef<"pre">>(null);
  const [copied, setCopied] = useState(false);

  const { className: language, children, ...rest } = props;

  const onCopy = (): void => {
    if (!preRef.current) return;

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);

    // clone the <code> element in order not to cause any change in actual DOM
    const code = preRef.current.getElementsByTagName("code")[0].cloneNode(true);

    // add eol to each code-line since there is no eol at the end when they are div
    Array.from((code as HTMLElement).querySelectorAll("div.code-line")).forEach(
      (line) => {
        line.innerHTML = line.innerHTML + "\r";
      }
    );

    void navigator.clipboard.writeText(code.textContent ?? "");
  };

  return (
    <pre ref={preRef} {...rest}>
      <span className="pre-language-label">{language}</span>
      <button className="pre-copy-button" onClick={onCopy}>
        {copied ? (
          <IconDone fill="var(--text-weak)" width="18px" height="18px" />
        ) : (
          <IconContentCopy fill="var(--text-weak)" width="18px" height="18px" />
        )}
      </button>
      {children}
    </pre>
  );
};

export default Pre;
