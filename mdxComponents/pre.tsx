import React, { type ElementRef, useRef, useState } from "react";

import IconContentCopy from "@/components/icons/IconContentCopy";
import IconDone from "@/components/icons/IconDone";

const pre = (props: React.ComponentPropsWithoutRef<"pre">) => {
  const preRef = useRef<ElementRef<"pre">>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = (): void => {
    setCopied(true);

    if (preRef.current) {
      void navigator.clipboard.writeText(
        preRef.current.textContent ?? "" //?.replace(/^(content_copy)/u, "")
      );
    }

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <pre ref={preRef} {...props} style={{ position: "relative" }}>
      <span className="pre-language-label">{props.className}</span>
      <button className="pre-copy-button" onClick={onCopy}>
        {copied ? (
          <IconDone fill="var(--text-weak)" width="18px" height="18px" />
        ) : (
          <IconContentCopy fill="var(--text-weak)" width="18px" height="18px" />
        )}
      </button>
      {props.children}
    </pre>
  );
};

export default pre;
